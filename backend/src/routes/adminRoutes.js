import express from "express";
import { getAdminOverview, getAllUsers } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";``

const router = express.Router();
router.get("/overview", protect, adminOnly, getAdminOverview);
router.get("/users", protect, adminOnly, getAllUsers);
export default router;
