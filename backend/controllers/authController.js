const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
let refreshTokens = new Set();

// const generateToken = require("../utils/generateToken");

class AuthController {
  static async register(req, res) {
    const { name, email, phone, password, role } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        role: role || "user",
        otp,
        otpExpires,
        profileImage,
      });

      await sendEmail(
        email,
        "Verify your email",
        { name, otp },
        "otp-template.html"
      );
      res
        .status(201)
        .json({ message: "User registered, check your email for OTP" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async verifyOTP(req, res) {
    const { email, otp } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      user.isVerified = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async resendOTP(req, res) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
      if (user.isVerified)
        return res.status(400).json({ message: "User already verified" });

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();

      await sendEmail(
        email,
        "Resend OTP",
        { name: user.name, otp },
        "otp-template.html"
      );
      res.status(200).json({ message: "OTP resent successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !user.isVerified) {
        return res.status(400).json({
          message: "Invalid credentials or email not verified",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      refreshTokens.add(refreshToken); // optionally store in DB

      // const token = generateToken(user._id);
      // console.log("User ID before signing token:", user._id);
      // const token = generateToken(user); // pass full user object now
      // res.status(200).json({ token });
      //     res.status(200).json({ token, role: user.role }); // 👈 send role too
      //   } catch (err) {
      //     res.status(500).json({ message: err.message });
      //   }
      // }

      res.status(200).json({
        accessToken,
        refreshToken,
        role: user.role,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  //for refreshtoken
  static async refreshToken(req, res) {
    const { token } = req.body;
    console.log("Incoming refresh token:", token);
    if (!token)
      return res.status(401).json({ message: "Refresh token required" });

    if (!refreshTokens.has(token)) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const newAccessToken = generateAccessToken(user);
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = req.user;
      const profile = {
        ...user._doc,
        profileImage: user.profileImage
          ? `${req.protocol}://${req.get("host")}/uploads/${user.profileImage}`
          : null,
      };

      res.json(profile);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // static async forgotPassword(req, res) {
  //   const { email } = req.body;
  //   try {
  //     const user = await User.findOne({ email });
  //     if (!user) return res.status(404).json({ message: "User not found" });

  //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
  //     const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  //     user.otp = otp;
  //     user.otpExpires = otpExpires;
  //     await user.save();

  //     await sendEmail(
  //       email,
  //       "Reset Password OTP",
  //       { name: user.name, otp },
  //       "otp-template.html"
  //     );
  //     res.status(200).json({ message: "OTP sent to email" });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // }

  // static async resetPassword(req, res) {
  //   const { email, otp, newPassword } = req.body;
  //   try {
  //     const user = await User.findOne({ email });
  //     if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
  //       return res.status(400).json({ message: "Invalid or expired OTP" });
  //     }

  //     user.password = await bcrypt.hash(newPassword, 10);
  //     user.otp = null;
  //     user.otpExpires = null;
  //     await user.save();
  //     res.status(200).json({ message: "Password reset successful" });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // }

  static async sendResetPasswordLink(req, res) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const secret = user._id + process.env.JWT_SECRET;
      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: "20m",
      });

      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${token}`;

      await sendEmail(
        email,
        "Reset Your Password",
        { name: user.name, resetLink },
        "reset-password-link.html"
      );

      res.status(200).json({
        message: "Password reset link sent. Please check your email.",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async resetPasswordWithToken(req, res) {
    const { password, confirmPassword } = req.body;
    const { id, token } = req.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({ message: "Invalid user" });
      }

      const secret = user._id + process.env.JWT_SECRET;
      try {
        jwt.verify(token, secret);
      } catch (err) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      if (!password || !confirmPassword) {
        return res
          .status(400)
          .json({ message: "Password and confirmation are required" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
      await user.save();

      res.status(200).json({ message: "Password has been reset successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error: " + err.message });
    }
  }

  static async changePassword(req, res) {
    const { email, currentPassword, newPassword } = req.body;

    try {
      const user = await User.findOne({ _id: req.user._id, email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found or email incorrect" });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      res.json({ message: "Password updated successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = AuthController;
