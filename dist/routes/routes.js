"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/AuthController");
const router = express_1.default.Router();
router.post("/signup", AuthController_1.AuthController.signup);
router.post("/login", AuthController_1.AuthController.login);
exports.default = router;
//# sourceMappingURL=routes.js.map