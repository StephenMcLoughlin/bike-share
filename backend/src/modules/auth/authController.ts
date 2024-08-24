import { NextFunction, Request, Response } from "express";
import UserService from "../user/userService";
import { compare } from "bcrypt";
import { hash } from "../../utils/hash";

class AuthController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    const { password, ...userData } = req.body;
    try {
      const user = {
        ...userData,
        password: await hash(password),
      };
      const response = await this.userService.createUser(user);

      return res.status(200).json({ success: true, data: { user: response } });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response) {
    // todo: implement this correctly
    // const { email, password } = req.body;
    // const user = await this.userService.getUserByEmail(email);
    // if (!user) {
    //   return res.status(404).json({ success: false });
    // }
    // const userPassword = user.password;
    // const isMatch = compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ success: false, data: {} });
    // }
    // const { password, ...data } = user;
    // return res.status(200).json({ success: true, data });
  }

  public async logout(req: Request, res: Response) {}
}

export default AuthController;
