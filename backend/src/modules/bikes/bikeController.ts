import { Request, Response } from "express";
import BikeService from "./bikeService";
import { ERROR_MESSSAGE } from "../../constants/const";

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
    const { id } = req.params;
    const bike = await this.bikeService.getBikeById(Number(id));

    return res.status(200).json({ success: true, data: bike });
  }

  async createBikes(req: Request, res: Response) {
    const { bikes } = req.body;

    const createdBikes = await this.bikeService.createBikes(bikes);

    if (!createdBikes.length) {
      return res
        .status(500)
        .json({ success: false, message: ERROR_MESSSAGE.GENERIC });
    }

    return res.status(200).json({ success: true, data: createdBikes });
  }
}

export default BikeController;
