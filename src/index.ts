import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { ServerPort } from "./helpers/constants";
import db from "./libs/database";
import routes from "./routes/routes";
import cors from "cors";

dotenv.config();

const e: Express = express();
const port: number = parseInt(process.env.PORT || ServerPort, 10);

db.on("open", () => {
  console.log("Database connected successfully");
});

e.use(cors());
e.get("/", (_req: Request, res: Response) => {
  res.send("Hello, TypeScript Express! Database connection established.");
});

e.use(express.json());

e.use(routes);

e.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
