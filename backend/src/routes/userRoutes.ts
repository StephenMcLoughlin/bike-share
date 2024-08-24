import express from "express";
import { userController } from "../modules/user/userModule";
import { validateRequest } from "../middleware/validateRequest";
import { idSchemaNumber } from "../schemas/userSchema";

const router = express.Router();

router.get("/v1/users", userController.getUsers.bind(userController));
router.get(
  "/v1/users/:id",
  validateRequest(idSchemaNumber, "params"),
  userController.getUserById.bind(userController)
);
router.post("/v1/users", userController.createUser.bind(userController));

export { router as userRouter };
