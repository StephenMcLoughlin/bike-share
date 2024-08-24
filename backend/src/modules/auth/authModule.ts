import { Database } from "../../db/db";
import UserService from "../user/userService";
import AuthController from "./authController";

const userService = new UserService(Database.getInstance());
const authController = new AuthController(userService);

export { authController };
