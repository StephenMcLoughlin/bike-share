import { Database } from "../../db/db";
import UserController from "./userController";
import UserService from "./userService";

const userService = new UserService(Database.getInstance());
const userController = new UserController(userService);

export { userController };
