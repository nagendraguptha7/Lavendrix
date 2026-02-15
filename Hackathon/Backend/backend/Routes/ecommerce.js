// Routes/ecommerce.js (updated with auth)
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authenticateToken = require("../Middleware/auth");

// Configure multer for ecommerce uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userDir = path.join(__dirname, `../uploads/ecommerce/${req.user.id}`);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "ecommerce-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|txt|csv|xlsx?|json/;
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
  limits: { fileSize: 10 * 1024 * 1024 }
});

// In-memory storage
const ecommerceAnalyses = [];

// Analysis template
const ecommerceAnalysis = {
  heavyLoadScore: 78,
  bottleneckPoints: ["Database Scaling", "API Rate Limits"],
  suggestedActions: ["Load Balancer Optimization", "Database Caching"],
  scalabilityInsights: "Critical scaling bottlenecks detected under high traffic conditions. Optimize load balancing and database performance to prevent potential revenue leakage.",
  revenueImpact: 82,
  infrastructure: {
    autoScaling: 45,
    paymentGateway: 88,
    database: 74,
    cacheHitRatio: 67
  },
  predictions: {
    peakLoad: 15200,
    estimatedRevenue: "$2.4M",
    recommendedInstances: 8,
    estimatedResponseTime: "245ms"
  }
};

// Protect all routes
router.use(authenticateToken);

/* =========================
   1. ANALYZE SCALABILITY
========================= */
router.post("/analyze", upload.array("files", 10), (req, res) => {
  try {
    const files = req.files;
    const userId = req.user.id;
    
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const analysisRecord = {
      id: ecommerceAnalyses.length + 1,
      userId,
      ...ecommerceAnalysis,
      files: files.map(f => ({
        originalName: f.originalname,
        filename: f.filename,
        size: f.size,
        path: f.path
      })),
      analyzedAt: new Date().toISOString(),
      projectName: "Online Marketplace Expansion",
      systemType: "Marketplace"
    };

    ecommerceAnalyses.push(analysisRecord);

    console.log(`🛒 E-commerce analysis completed for user ${userId}`);

    res.json({
      success: true,
      message: "Scalability analysis completed",
      analysis: analysisRecord
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   2. RUN PREDICTION
========================= */
router.post("/predict", upload.array("files", 10), (req, res) => {
  try {
    const userId = req.user.id;
    const { trafficPattern, season } = req.body;
    
    // Dynamic prediction based on input
    const prediction = {
      ...ecommerceAnalysis.predictions,
      peakLoad: season === "holiday" ? 25000 : 15200,
      estimatedRevenue: season === "holiday" ? "$3.8M" : "$2.4M",
      confidence: 87,
      timestamp: new Date().toISOString()
    };
    
    res.json({
      success: true,
      prediction,
      disclaimer: "Predictions based on historical patterns and current metrics"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   3. GET USER ANALYSES
========================= */
router.get("/my-analyses", (req, res) => {
  try {
    const userId = req.user.id;
    const userAnalyses = ecommerceAnalyses.filter(a => a.userId === userId);
    
    res.json({
      success: true,
      analyses: userAnalyses.map(a => ({
        id: a.id,
        date: a.analyzedAt,
        loadScore: a.heavyLoadScore,
        revenueImpact: a.revenueImpact,
        files: a.files.length
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   4. GET INFRASTRUCTURE STATUS
========================= */
router.get("/infrastructure", (req, res) => {
  try {
    res.json({
      success: true,
      infrastructure: {
        services: [
          { name: "Load Balancer", status: "operational", latency: "45ms" },
          { name: "Database", status: "degraded", latency: "245ms" },
          { name: "Cache", status: "operational", hitRate: "78%" },
          { name: "Payment Gateway", status: "operational", latency: "120ms" },
          { name: "CDN", status: "operational", coverage: "98%" }
        ],
        alerts: [
          { severity: "warning", message: "Database connection pool near limit" },
          { severity: "info", message: "API rate limits at 65%" }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;