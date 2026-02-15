const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure User model exists
require("dotenv").config();

const router = express.Router();

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =========================
   1. REGISTRATION EMAIL & USER CREATION
========================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: "All fields required" });
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const mailOptions = {
      from: `"Lavendrix Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Registration Successful - Lavendrix",
      html: `
        <h2>Welcome to Lavendrix</h2>
        <p>Hello ${name},</p>
        <p>Thanks for choosing Lavendrix.</p>
        <p>Your account has been successfully created. Now you can use your Email and Password to Login.</p>
        <br/>
        <p>Regards,<br/>Team Lavendrix</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "User registered and email sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});

/* =========================
   2. LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

/* =========================
   3. FORGOT PASSWORD EMAIL
========================= */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`; // Secure token-based link

    const mailOptions = {
      from: `"Lavendrix Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password - Lavendrix",
      html: `
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" 
           style="padding:10px 15px;background:#10b981;color:white;text-decoration:none;border-radius:6px;">
           Reset Password
        </a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Reset link sent to email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to send reset email",
    });
  }
});

/* =========================
   4. RESET PASSWORD API
========================= */
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, message: "Invalid token" });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Password reset failed",
    });
  }
});

module.exports = router;