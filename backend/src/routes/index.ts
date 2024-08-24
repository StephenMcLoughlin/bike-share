import express from "express";
import { userRouter } from "./userRoutes";
import { authRouter } from "./authRoutes";
import asyncHandler from "../middleware/asyncHandler";

const router = express.Router();
// probably a cleaner way
router.use("/api", asyncHandler(userRouter));
router.use("/api", asyncHandler(authRouter));

export default router;
