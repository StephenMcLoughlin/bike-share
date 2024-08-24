import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { Database } from "./db/db";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(errorHandler);

process.on("SIGINT", async () => {
  await Database.close();
  process.exit(0);
});
