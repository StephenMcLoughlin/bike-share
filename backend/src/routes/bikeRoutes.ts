import express from "express";
import { bikeController } from "../modules/bikes/bikeModule";
import { validateRequest } from "../middleware/validateRequest";
import { bikeIdSchema, createBikesSchema } from "../schemas/bikeSchema";

const router = express.Router();

router.get("/v1/bikes", bikeController.getBikes.bind(bikeController));
router.get(
  "/v1/bikes/:id",
  validateRequest(bikeIdSchema),
  bikeController.getBikeById.bind(bikeController)
);
router.post(
  "/v1/bikes",
  validateRequest(createBikesSchema),
  bikeController.createBikes.bind(bikeController)
);

export { router as bikeRoutes };
