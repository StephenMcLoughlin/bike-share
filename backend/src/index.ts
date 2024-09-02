import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { Database } from "./db/db";
import errorHandler from "./middleware/errorHandler";
import requestLogger from "./middleware/requestLogger";
import logger from "./modules/logger/logger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(requestLogger);
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});

app.use(errorHandler);

process.on("SIGINT", async () => {
  await Database.close();
  process.exit(0);
});
