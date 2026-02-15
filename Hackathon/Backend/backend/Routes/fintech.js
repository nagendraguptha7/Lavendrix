// Routes/fintech.js (updated with auth)
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authenticateToken = require("../Middleware/auth");

// ... (multer configuration remains the same)

// Protect all fintech routes with authentication
router.use(authenticateToken);

// Now each route has access to req.user
router.post("/analyze", upload.array("files", 10), (req, res) => {
  try {
    const files = req.files;
    const userId = req.user.id; // Get user ID from token
    
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Store analysis with user ID
    const analysisResult = {
      userId,
      ...fintechAnalysis,
      timestamp: new Date().toISOString(),
      files: files.map(f => ({
        originalName: f.originalname,
        filename: f.filename,
        size: f.size
      }))
    };

    // Here you would save to database with user association

    res.json({
      success: true,
      message: "FinTech analysis completed",
      ...analysisResult
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's specific analyses
router.get("/my-analyses", (req, res) => {
  const userId = req.user.id;
  // Fetch from database where userId = userId
  res.json({
    analyses: [
      { id: 1, date: "2024-01-15", type: "Loan System", score: 85, userId },
      { id: 2, date: "2024-01-14", type: "Payment Gateway", score: 72, userId }
    ]
  });
});

module.exports = router;