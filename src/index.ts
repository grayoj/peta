import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { ServerPort } from "./helpers/constants";

dotenv.config();

const e: Express = express();
const port: number = parseInt(process.env.PORT || ServerPort, 10);

e.get("/", (_req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

e.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
