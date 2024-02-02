import mongoose, { Connection } from "mongoose";
import { MongoConnectionUri } from "../../helpers/constants";

const MONGO_URI = process.env.MONGO_URI || MongoConnectionUri;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  MONGO_URI,
  mongoOptions as typeof mongoose.connect extends (
    uri: any,
    options: infer Options,
  ) => any
  ? Options
  : never,
);

interface DatabaseConnection extends Connection { }

export const db: DatabaseConnection = mongoose.connection as DatabaseConnection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

export default db;
