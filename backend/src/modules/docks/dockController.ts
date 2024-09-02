import { Request, Response } from "express";
import DockService from "./dockService";

class DockController {
  private dockService: DockService;

  constructor(dockService: DockService) {
    this.dockService = dockService;
  }

  async getDocks(req: Request, res: Response) {
    const docks = await this.dockService.getDocks();

    return res.status(200).json({ success: true, data: docks });
  }

  async getDockById(req: Request, res: Response) {
    const dock = await this.dockService.getDockById();

    return res.status(200).json({ success: true, data: dock });
  }
}

export default DockController;
