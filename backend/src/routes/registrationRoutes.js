import express from "express";
import { createRegistration, getAllRegistrations } from "../controllers/registrationController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createRegistration);
router.get("/", adminOnly, getAllRegistrations);

export default router;
