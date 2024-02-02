"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("./helpers/constants");
const database_1 = __importDefault(require("./libs/database"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || constants_1.ServerPort, 10);
database_1.default.on("open", () => {
    console.log("Database connected successfully");
});
app.get("/", (_req, res) => {
    res.send("Hello, TypeScript Express! Database connection established.");
});
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map