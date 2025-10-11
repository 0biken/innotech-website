import express from "express";
import { createSubmission, getSubmissions, getMySubmissions } from "../controllers/submissionController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createSubmission);
router.get("/", adminOnly, getSubmissions);

export default router;
router.get("/my", protect, getMySubmissions); 