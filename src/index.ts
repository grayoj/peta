import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { ServerPort } from "./helpers/constants";
import db from "./libs/database";
import routes from "./routes/routes";

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || ServerPort, 10);

db.on("open", () => {
  console.log("Database connected successfully");
});

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, TypeScript Express! Database connection established.");
});

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
