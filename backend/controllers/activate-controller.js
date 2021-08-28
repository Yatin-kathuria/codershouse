const Jimp = require("jimp");
const path = require("path");
const userService = require("../services/user-service");
const UserDto = require("../dtos/user-dtos");

class ActivateController {
  async activate(req, res) {
    const { name, image } = req.body;
    if (!name || !image) {
      res.status(400).json({ message: "All fields are required" });
    }
    // Image base64
    const buffer = Buffer.from(image.split("base64,")[1], "base64");

    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    try {
      const jimpRes = await Jimp.read(buffer);
      jimpRes
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (error) {
      res.status(500).json({ message: "Could not process the image" });
      return;
    }

    const userId = req.user._id;

    // update user
    try {
      const user = await userService.findUser({ _id: userId });

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();
      res.json({ auth: true, user: new UserDto(user) });
    } catch (error) {
      res.status(500).json({ message: "Somthing went wrong" });
    }
  }
}

module.exports = new ActivateController();
