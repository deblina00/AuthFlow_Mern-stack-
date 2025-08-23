const express = require("express");
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post(
  "/register",
  upload.single("profileImage"),
  AuthController.register
);
router.post("/verify-otp", AuthController.verifyOTP);
router.post("/resend-otp", AuthController.resendOTP);
router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken); //for refreshtoken
// console.log("typeof getProfile:", typeof AuthController.getProfile);
router.get("/profile", authMiddleware, AuthController.getProfile);
// router.post("/forgot-password", AuthController.forgotPassword);
// router.post("/reset-password", AuthController.resetPassword);
router.post("/forgot-password", AuthController.sendResetPasswordLink);
router.post(
  "/reset-password/:id/:token",
  AuthController.resetPasswordWithToken
);

router.put("/change-password", authMiddleware, AuthController.changePassword);

module.exports = router;
