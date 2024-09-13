import express from "express";
import { userController } from "../modules/user/userModule";
import { validateRequest } from "../middleware/validateRequest";
import { userIdSchema } from "../schemas/userSchema";

const router = express.Router();

router.get("/v1/users", userController.getUsers.bind(userController));
router.get(
  "/v1/users/:id",
  validateRequest(userIdSchema, "params"),
  userController.getUserById.bind(userController)
);
router.post("/v1/users", userController.createUser.bind(userController));

export { router as userRouter };
