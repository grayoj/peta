"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstname, lastname, username, email, password } = req.body;
                const token = yield AuthService_1.AuthService.signup(firstname, lastname, username, email, password);
                res.status(201).json({ token });
            }
            catch (error) {
                console.error("Error signing up:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield AuthService_1.AuthService.login(email, password);
                if (!token) {
                    res.status(401).json({ message: "Invalid credentials" });
                    return;
                }
                res.status(200).json({ token, email });
            }
            catch (error) {
                console.error("Error logging in:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map