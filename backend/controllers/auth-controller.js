const hashService = require("../services/hash-service");
const otpService = require("../services/otp-service");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ message: "Phone field is required" });
    }

    const otp = await otpService.generateOtp();
    const ttl = 1000 * 60 * 2; // 2 min
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);
    res.json({ otp, hash });
  }
}

module.exports = new AuthController();
