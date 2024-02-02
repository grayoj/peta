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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../models/UserModel");
const constants_1 = require("../helpers/constants");
class AuthService {
    static signup(firstname, lastname, username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new UserModel_1.UserModel({
                firstname,
                lastname,
                username,
                email,
                password: hashedPassword,
            });
            yield newUser.save();
            return this.generateToken(newUser._id);
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findOne({ email });
            if (!user)
                return null;
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch)
                return null;
            return this.generateToken(user._id);
        });
    }
    static generateToken(userId) {
        return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || constants_1.JwtSecret, {
            expiresIn: "1h",
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map