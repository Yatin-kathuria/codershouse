const router = require("express").Router();
const activateController = require("../controllers/activate-controller");
const authController = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.get("/api/refresh", authController.refresh);
router.post("/api/logout", authMiddleware, authController.logout);

router.post("/api/activate", authMiddleware, activateController.activate);

module.exports = router;
