import { Request, Response } from "express";
import BikeService from "./bikeService";

class BikeController {
  bikeService: BikeService;

  constructor(bikeService: BikeService) {
    this.bikeService = bikeService;
  }

  async getBikes(req: Request, res: Response) {
    const bikes = await this.bikeService.getBikes();

    return res.status(200).json({ success: true, data: bikes });
  }

  async getBikeById(req: Request, res: Response) {
    const bike = await this.bikeService.getBikeById();

    return res.status(200).json({ success: true, data: bike });
  }
}

export default BikeController;
