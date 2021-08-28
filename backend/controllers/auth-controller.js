const UserDto = require("../dtos/user-dtos");
const hashService = require("../services/hash-service");
const otpService = require("../services/otp-service");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ message: "Phone field is required" });
    }

    const otp = await otpService.generateOtp();

    // hash
    const ttl = 1000 * 60 * 2; // 2 min expires time for OTP
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);

    // send otp
    try {
      // await otpService.sendBySms(phone, otp);
      res.json({ hash: `${hash}.${expires}`, phone, otp });
    } catch (error) {
      console.log(err);
      res.status(500).json({ message: "message sending failed" });
    }
  }

  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "all fields are required" });
    }

    const [hashOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({ message: "OTP expired" });
    }

    const data = `${phone}.${otp}.${expires}`;

    const isValid = otpService.verifyOtp(hashOtp, data);

    if (!isValid) {
      res.status(400).json({ message: "Invalid OTP" });
    }

    let user;

    try {
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Db error" });
    }

    // JWT Token
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: user.activated,
    });

    await tokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    const userDto = new UserDto(user);

    res.json({ user: userDto, auth: true });
  }

  async refresh(req, res) {
    // get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;

    // check if token is valid
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }

    // check if token is in db
    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        res.status(401).json({ message: "Invalid token" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal error" });
    }

    // check if valid token
    const user = await userService.findUser({ _id: userData._id });
    if (!user) {
      res.status(404).json({ message: "No user" });
    }

    // generate new tokens (both)
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: userData._id,
    });

    // update refresh token
    try {
      tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (error) {
      res.status(500).json({ message: "Internal error" });
    }

    // put in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    // send response
    const userDto = new UserDto(user);

    res.json({ user: userDto, auth: true });
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;

    //deleterefresh token fron db
    await tokenService.removeToken(refreshToken);

    // delete cookies

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.json({ user: null, isAuth: false });
  }
}

module.exports = new AuthController();
