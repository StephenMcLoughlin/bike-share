import express from "express";
import { authController } from "../modules/auth/authModule";
import { validateRequest } from "../middleware/validateRequest";
import { createUserSchema, userLoginSchema } from "../schemas/userSchema";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post(
  "/v1/auth/login",
  validateRequest(userLoginSchema),
  authController.login.bind(authController)
);
router.post(
  "/v1/auth/register",
  validateRequest(createUserSchema),
  authController.register.bind(authController)
);
router.post(
  "/v1/auth/refresh",
  auth,
  authController.refresh.bind(authController)
);
router.post(
  "/v1/auth/signout",
  auth,
  authController.logout.bind(authController)
);

export { router as authRouter };
