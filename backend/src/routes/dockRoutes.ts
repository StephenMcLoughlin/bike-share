import express from "express";
import { dockController } from "../modules/docks/dockModule";

const router = express.Router();

router.get("/v1/docks", dockController.getDocks.bind(dockController));
router.get("/v1/docks/:id", dockController.getDockById.bind(dockController));

export { router as dockRoutes };
