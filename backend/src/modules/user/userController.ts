import { Request, Response } from "express";
import UserService from "./userService";

class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    return res.status(200).json({ success: true, data: { users } });
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.getUserById(Number(id));

    return res.status(200).json({ success: true, data: { user } });
  }

  async createUser(req: Request, res: Response) {
    return res.status(200).json({ ...req.body });
  }
}

export default UserController;
