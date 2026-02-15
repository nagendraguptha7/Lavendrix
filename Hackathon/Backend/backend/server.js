// server.js (updated with MongoDB)
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose"); // 🔥 ADD THIS

// Import routes
const authRoutes = require("./Routes/auth");
const fintechRoutes = require("./Routes/fintech");
const healthcareRoutes = require("./Routes/healthcare");
const ecommerceRoutes = require("./Routes/ecommerce");
const edtechRoutes = require("./Routes/edtech");

dotenv.config();

const app = express();

// 🔥 CONNECT TO MONGODB ATLAS (ADD THIS BLOCK)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB  Connected Successfully");
})
.catch((error) => {
  console.error("❌ MongoDB Connection Error:", error);
});

// Ensure upload directories exist
const uploadDirs = [
  'uploads/fintech',
  'uploads/healthcare',
  'uploads/ecommerce',
  'uploads/edtech'
];

uploadDirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // 🔥 Vite React runs on 5173 (not 3000)
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/fintech", fintechRoutes);
app.use("/api/healthcare", healthcareRoutes);
app.use("/api/ecommerce", ecommerceRoutes);
app.use("/api/edtech", edtechRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Lavendrix Backend Running 🚀");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Upload directories ready`);
});
