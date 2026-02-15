// Routes/edtech.js (updated with auth)
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authenticateToken = require("../Middleware/auth");

// Configure multer for edtech uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userDir = path.join(__dirname, `../uploads/edtech/${req.user.id}`);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "edtech-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|txt|csv|xlsx?/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only document files are allowed"));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// In-memory storage for analyses (replace with database)
const edtechAnalyses = [];

// Analysis result template
const edtechAnalysis = {
  engagementDropProbability: 72,
  dropFactors: ["Content Fatigue", "Interaction Gaps"],
  suggestedActions: ["Gamification Features", "Personalized Recommendations"],
  userActivityLossImpact: "Moderate",
  engagementInsights: "Moderate engagement drop probability detected. Enhance interactive elements and personalization features to boost user engagement.",
  accessibilityScore: 6.8,
  performanceScore: 84,
  engagementRisk: "Moderate",
  metrics: {
    dailyActiveUsers: 12400,
    avgSessionDuration: 24,
    completionRate: 42,
    weeklyGrowth: "+5.2%",
    monthlyGrowth: "+12.8%"
  },
  accessibilityMetrics: {
    wcagCompliance: "AA",
    screenReaderCompatibility: 87,
    colorContrast: 92,
    keyboardNavigation: 78
  },
  peakUsage: {
    morning: 2400,
    afternoon: 5800,
    evening: 4200
  }
};

// Protect all edtech routes
router.use(authenticateToken);

/* =========================
   1. ANALYZE ENGAGEMENT
========================= */
router.post("/analyze", upload.array("files", 10), async (req, res) => {
  try {
    const files = req.files;
    const userId = req.user.id;
    
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Create analysis record
    const analysisRecord = {
      id: edtechAnalyses.length + 1,
      userId,
      ...edtechAnalysis,
      files: files.map(f => ({
        originalName: f.originalname,
        filename: f.filename,
        size: f.size,
        path: f.path
      })),
      analyzedAt: new Date().toISOString(),
      projectName: "Online Learning Platform Enhancement",
      systemType: "LMS (Learning Management)"
    };

    edtechAnalyses.push(analysisRecord);

    // Log for debugging
    console.log(`📊 EdTech analysis completed for user ${userId}:`, {
      analysisId: analysisRecord.id,
      files: files.length,
      engagementDrop: edtechAnalysis.engagementDropProbability
    });

    res.json({
      success: true,
      message: "Engagement analysis completed successfully",
      analysis: analysisRecord
    });
  } catch (error) {
    console.error("EdTech analysis error:", error);
    res.status(500).json({ 
      error: "Analysis failed", 
      message: error.message 
    });
  }
});

/* =========================
   2. GET USER'S ANALYSES
========================= */
router.get("/my-analyses", (req, res) => {
  try {
    const userId = req.user.id;
    const userAnalyses = edtechAnalyses.filter(a => a.userId === userId);
    
    res.json({
      success: true,
      analyses: userAnalyses.map(a => ({
        id: a.id,
        date: a.analyzedAt,
        engagementDrop: a.engagementDropProbability,
        accessibilityScore: a.accessibilityScore,
        performanceScore: a.performanceScore,
        files: a.files.length
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   3. GET SPECIFIC ANALYSIS
========================= */
router.get("/analyses/:id", (req, res) => {
  try {
    const userId = req.user.id;
    const analysisId = parseInt(req.params.id);
    
    const analysis = edtechAnalyses.find(
      a => a.id === analysisId && a.userId === userId
    );
    
    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }
    
    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   4. GET CURRENT METRICS
========================= */
router.get("/metrics", (req, res) => {
  try {
    const userId = req.user.id;
    
    // In real app, fetch from database
    res.json({
      success: true,
      metrics: {
        current: {
          users: 12400,
          engagement: 72,
          accessibility: 6.8,
          performance: 84
        },
        trends: {
          weekly: "+5.2%",
          monthly: "+12.8%"
        },
        accessibility: {
          score: 6.8,
          components: {
            screenReader: 87,
            colorContrast: 92,
            keyboardNav: 78
          }
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   5. GENERATE CHECKOUT TEST
========================= */
router.post("/generate-test", (req, res) => {
  try {
    const userId = req.user.id;
    const { testType = "engagement" } = req.body;
    
    const testScenarios = {
      engagement: {
        id: `test-${Date.now()}`,
        type: "Engagement Test",
        scenarios: 24,
        successRate: 92,
        recommendations: [
          "Add gamification elements",
          "Implement personalized learning paths",
          "Increase interactive content"
        ]
      }
    };
    
    res.json({
      success: true,
      test: testScenarios[testType] || testScenarios.engagement
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   6. DELETE ANALYSIS
========================= */
router.delete("/analyses/:id", (req, res) => {
  try {
    const userId = req.user.id;
    const analysisId = parseInt(req.params.id);
    
    const index = edtechAnalyses.findIndex(
      a => a.id === analysisId && a.userId === userId
    );
    
    if (index === -1) {
      return res.status(404).json({ error: "Analysis not found" });
    }
    
    // Delete files
    const analysis = edtechAnalyses[index];
    analysis.files.forEach(file => {
      try {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (err) {
        console.error("Error deleting file:", err);
      }
    });
    
    edtechAnalyses.splice(index, 1);
    
    res.json({
      success: true,
      message: "Analysis deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;