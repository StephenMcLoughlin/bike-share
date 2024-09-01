import express from "express";
import { userRouter } from "./userRoutes";
import { authRouter } from "./authRoutes";
import asyncHandler from "../middleware/asyncHandler";
import { healthRouter } from "./healthRouter";

const router = express.Router();
router.use(asyncHandler(userRouter));
router.use(asyncHandler(authRouter));
router.use(asyncHandler(healthRouter));

export default router;
