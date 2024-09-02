import express from "express";
import { bikeController } from "../modules/bikes/bikeModule";

const router = express.Router();

router.get("/v1/bikes", bikeController.getBikes.bind(bikeController));
router.get("/v1/bikes/:id", bikeController.getBikeById.bind(bikeController));

export { router as bikeRoutes };
