import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// removed xss-clean due to it attempting to set read-only request properties
import mongoSanitize from "mongo-sanitize";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
// Simple recursive sanitizer that escapes <, >, &, ", '\\' in strings
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/\\'/g, "&#39;");
}

function sanitizeObject(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeObject);
  const out = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === "string") out[key] = escapeHtml(val);
    else if (typeof val === "object") out[key] = sanitizeObject(val);
    else out[key] = val;
  }
  return out;
}

// Only sanitize mutable parts of the request: body and params.
app.use((req, res, next) => {
  if (req.body) req.body = sanitizeObject(mongoSanitize(req.body));
  if (req.params) req.params = sanitizeObject(mongoSanitize(req.params));
  next();
});

// Rate Limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("INNOTECH 4.0 Backend is up and running"));

export default app;