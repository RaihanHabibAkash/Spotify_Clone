import { Router } from "express";
import { getStats } from "../controllers/stats.controller.js";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js"; 

const router = Router();

router.get("/", protectRoute, requireAdmin, getStats);

export default router;