require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const AuthManager = require("../auth");
const PermissionManager = require("../permissions");
const SecurityManager = require("../security");
const PaymentGateway = require("../payments-gateway");
const AIOrchestrator = require("../ai-orchestrator");
const VerificationService = require("../verification-service");
const TrialManager = require("../trial-manager");
const UsageManager = require("../usage-manager");
const OnboardingManager = require("../onboarding-manager");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const fs = require("fs");
const DocumentExtractor = require("../document-extractor");
const StudyToolsGenerator = require("../study-tools-generator");
const SRSManager = require("../srs-manager");
const QuizEngine = require("../quiz-engine");
const StudyPlanner = require("../study-planner");
const AnalyticsDashboard = require("../analytics-dashboard");
const GamificationEngine = require("../gamification-engine");

const app = express();
const PORT = process.env.PORT || 4000;
const AUTH_SERVER_BASE = process.env.AUTH_SERVER_BASE || "https://auth.simatech.uk";
const DB_FILE = process.env.DATABASE_FILE || path.join(__dirname, "..", "sima.db");
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(7)}_${file.originalname}`;
    cb(null, uniqueName);
  }
});

const uploadFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'text/plain',
    'text/markdown',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'image/jpeg',
    'image/png'
  ];
  
  if (allowedMimes.includes(file.mimetype) || file.originalname.match(/\.(pdf|txt|md|docx|pptx|jpg|jpeg|png)$/i)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: uploadFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max
});

// Restrict trust proxy to loopback to avoid permissive `true` setting
// which causes express-rate-limit to raise a ValidationError.
app.set('trust proxy', 'loopback');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://unpkg.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      styleSrcAttr: ["'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  }
}));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Handle invalid JSON bodies gracefully (prevent server crash on bad requests)
app.use((err, req, res, next) => {
  if (err && err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next();
});

app.use((req, res, next) => {
  req.ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  req.userAgent = req.headers["user-agent"];
  next();
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
  // Explicitly set trustProxy to acknowledge the `trust proxy` setting
  // and avoid express-rate-limit throwing during startup.
  trustProxy: true,
});
app.use("/api/", apiLimiter);

const db = new sqlite3.Database(DB_FILE, err => {
  if (err) {
    console.error("Failed to open database:", err);
    process.exit(1);
  }
  console.log("✓ Database connected");
});

// Initialize managers
const authManager = new AuthManager(db);
authManager.ensureReviewAccount().then((result) => {
  console.log(`✓ Review account ready: ${result.email} / ${process.env.REVIEW_ACCOUNT_PASSWORD || "g00gleplay$#%1234"}`);
}).catch((error) => {
  console.error("Failed to initialize review account:", error);
});
const permissionManager = new PermissionManager(db);
const securityManager = new SecurityManager(db);
const AdminManager = require("../admin-manager");
const adminRouter = require("../admin-api");
const paymentGateway = new PaymentGateway(db, securityManager);
const aiOrchestrator = new AIOrchestrator(db);
const verificationService = new VerificationService();
const trialManager = new TrialManager(db);
const usageManager = new UsageManager(db);
const onboardingManager = new OnboardingManager(db);

// Serve frontend files and admin UI
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));
app.use(express.static(path.join(__dirname, '..')));

// Mount admin API (requires backend session auth)
const adminManager = new AdminManager(db, authManager, securityManager, trialManager);
app.use('/api/admin', adminRouter(db, authManager, permissionManager, adminManager, securityManager));

// Middleware to verify authentication
const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Authorization required" });
  }

  const session = await authManager.validateSession(token);
  if (!session) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.userId = session.userId;
  req.sessionId = session.sessionId;
  req.deviceId = session.deviceId;
  next();
};

// (Remaining endpoints are identical to the root server.js - kept for safe copy)

module.exports = app;
