const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user", // default for new users
    },
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpires: Date,
    profileImage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
