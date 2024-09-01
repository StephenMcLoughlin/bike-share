import { Request, Response } from "express";

class HealthController {
  constructor() {}

  async getHealth(req: Request, res: Response) {
    return res.status(200).json({ success: true });
  }
}

export default new HealthController();
