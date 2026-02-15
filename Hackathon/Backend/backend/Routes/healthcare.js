// Routes/healthcare.js (updated with auth)
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authenticateToken = require("../Middleware/auth");

// Configure multer for healthcare uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userDir = path.join(__dirname, `../uploads/healthcare/${req.user.id}`);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "healthcare-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|txt|csv|xlsx?|hl7|fhir/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only healthcare document formats are allowed"));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// In-memory storage
const healthcareScans = [];

// Analysis template
const healthcareAnalysis = {
  phiSecurityScore: 84,
  vulnerabilityAreas: ["Encryption Gaps", "Access Control Risks"],
  mitigations: ["Advanced Encryption (AES-256)", "Role-Based Access Control"],
  dataBreachImpact: "Severe",
  securityInsights: "High PHI security score, but identified vulnerabilities in encryption and access controls. Immediate action needed to enhance patient data protection.",
  hipaaStatus: {
    privacyRule: "Partial",
    securityRule: "Gap Identified",
    breachNotification: "Compliant",
    omnibusRule: "In Progress"
  },
  accessControl: {
    totalUsers: 1284,
    privilegedUsers: 43,
    rbacImplementation: 65,
    mfaEnabled: 78
  },
  encryptionStatus: {
    dataAtRest: "AES-256",
    dataInTransit: "TLS 1.3",
    keyManagement: "AWS KMS",
    gaps: ["Database encryption", "Backup encryption"]
  }
};

// Protect all routes
router.use(authenticateToken);

/* =========================
   1. SCAN EHR SYSTEM
========================= */
router.post("/scan", upload.array("files", 10), (req, res) => {
  try {
    const files = req.files;
    const userId = req.user.id;
    
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const scanRecord = {
      id: healthcareScans.length + 1,
      userId,
      ...healthcareAnalysis,
      files: files.map(f => ({
        originalName: f.originalname,
        filename: f.filename,
        size: f.size,
        path: f.path
      })),
      scannedAt: new Date().toISOString(),
      projectName: "Patient Data Management Platform",
      systemType: "EHR System",
      dataSensitivity: "High"
    };

    healthcareScans.push(scanRecord);

    console.log(`🏥 Healthcare scan completed for user ${userId}`);

    res.json({
      success: true,
      message: "Healthcare scan completed successfully",
      scan: scanRecord
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   2. GET USER SCANS
========================= */
router.get("/my-scans", (req, res) => {
  try {
    const userId = req.user.id;
    const userScans = healthcareScans.filter(s => s.userId === userId);
    
    res.json({
      success: true,
      scans: userScans.map(s => ({
        id: s.id,
        date: s.scannedAt,
        securityScore: s.phiSecurityScore,
        vulnerabilities: s.vulnerabilityAreas.length,
        files: s.files.length
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   3. GET SPECIFIC SCAN
========================= */
router.get("/scans/:id", (req, res) => {
  try {
    const userId = req.user.id;
    const scanId = parseInt(req.params.id);
    
    const scan = healthcareScans.find(
      s => s.id === scanId && s.userId === userId
    );
    
    if (!scan) {
      return res.status(404).json({ error: "Scan not found" });
    }
    
    res.json({
      success: true,
      scan
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   4. GET COMPLIANCE STATUS
========================= */
router.get("/compliance", (req, res) => {
  try {
    res.json({
      success: true,
      compliance: {
        hipaa: {
          status: "In Progress",
          lastAudit: "2024-01-15",
          nextAudit: "2024-04-15",
          findings: 3
        },
        gdpr: {
          status: "Compliant",
          lastAudit: "2024-02-01",
          nextAudit: "2024-05-01"
        },
        hitrust: {
          status: "Certified",
          validUntil: "2024-12-31"
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   5. RUN COMPLIANCE CHECK
========================= */
router.post("/check-compliance", (req, res) => {
  try {
    const { standard = "hipaa" } = req.body;
    
    const checks = {
      hipaa: [
        { rule: "Privacy Rule", status: "partial", severity: "medium" },
        { rule: "Security Rule", status: "failed", severity: "high" },
        { rule: "Breach Notification", status: "passed", severity: "low" }
      ]
    };
    
    res.json({
      success: true,
      standard,
      checks: checks[standard] || checks.hipaa,
      recommendations: [
        "Implement encryption for all PHI data",
        "Update access control policies",
        "Conduct security awareness training"
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   6. DELETE SCAN
========================= */
router.delete("/scans/:id", (req, res) => {
  try {
    const userId = req.user.id;
    const scanId = parseInt(req.params.id);
    
    const index = healthcareScans.findIndex(
      s => s.id === scanId && s.userId === userId
    );
    
    if (index === -1) {
      return res.status(404).json({ error: "Scan not found" });
    }
    
    // Delete associated files
    const scan = healthcareScans[index];
    scan.files.forEach(file => {
      try {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (err) {
        console.error("Error deleting file:", err);
      }
    });
    
    healthcareScans.splice(index, 1);
    
    res.json({
      success: true,
      message: "Scan deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;