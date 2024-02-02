"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../../helpers/constants");
const MONGO_URI = process.env.MONGO_URI || constants_1.MongoConnectionUri;
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default.connect(MONGO_URI, mongoOptions);
exports.db = mongoose_1.default.connection;
exports.db.on("error", console.error.bind(console, "MongoDB connection error:"));
exports.db.once("open", () => {
    console.log("Connected to MongoDB database");
});
exports.default = exports.db;
//# sourceMappingURL=index.js.map