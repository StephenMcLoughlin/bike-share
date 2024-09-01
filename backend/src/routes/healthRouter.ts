import express from "express";
import healthController from "../modules/health/healthController";

const router = express.Router();

router.get("/health", healthController.getHealth.bind(healthController));

export { router as healthRouter };
