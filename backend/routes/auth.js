const router = require("express").Router();
const AuthController = require("../controllers/auth-controller");

router.post("/api/send-otp", AuthController.sendOtp);

module.exports = router;
