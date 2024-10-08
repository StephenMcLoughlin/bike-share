import { NextFunction, Request, Response } from "express";
import UserService from "../user/userService";
import { compare } from "bcrypt";
import { hash } from "../../utils/hash";
import { createAccessTokens } from "../../utils/jwt";
import redisClient from "../../cache/redisClient";
import { ERROR_MESSSAGE, MONTH_IN_MILLISECONDS } from "../../constants/const";

class AuthController {
  private userService: UserService;

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

      const createdUser = await this.userService.createUser(user);
      if (!createdUser) {
        return res.status(500).json({
          success: false,
          message: ERROR_MESSSAGE.GENERIC,
          data: null,
        });
      }

      return res
        .status(200)
        .json({ success: true, data: { user: createdUser } });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password: userPasswordInput } = req.body;
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        data: null,
      });
    }

    const isMatch = compare(userPasswordInput, user?.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, data: null });
    }

    const { password, ...userData } = user;
    const tokens = createAccessTokens(userData);
    if (!tokens) {
      return res
        .status(500)
        .json({ success: false, message: ERROR_MESSSAGE.GENERIC });
    }

    redisClient.set(tokens.refreshToken, String(user.id), {
      EX: MONTH_IN_MILLISECONDS,
    });

    return res.status(200).json({
      success: true,
      data: {
        user: { ...userData },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
  }

  public async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
  }

  public async logout(req: Request, res: Response) {}
}

export default AuthController;
