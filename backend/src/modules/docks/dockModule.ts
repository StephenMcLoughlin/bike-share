import { Database } from "../../db/db";
import DockController from "./dockController";
import DockService from "./dockService";

const dockService = new DockService(Database.getInstance());
const dockController = new DockController(dockService);

export { dockController };
