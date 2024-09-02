import express from "express";
import { userRouter } from "./userRoutes";
import { authRouter } from "./authRoutes";
import asyncHandler from "../middleware/asyncHandler";
import { healthRouter } from "./healthRouter";
import { auth } from "../middleware/auth";
import { dockRoutes } from "./dockRoutes";
import { bikeRoutes } from "./bikeRoutes";

const router = express.Router();

router.use(asyncHandler(authRouter));
router.use(auth, asyncHandler(bikeRoutes));
router.use(auth, asyncHandler(dockRoutes));
router.use(asyncHandler(healthRouter));
router.use(auth, asyncHandler(userRouter));

export default router;
