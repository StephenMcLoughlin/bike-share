import { Database } from "../../db/db";
import BikeController from "./bikeController";
import BikeService from "./bikeService";

const bikeService = new BikeService(Database.getInstance());
const bikeController = new BikeController(bikeService);

export { bikeController };
