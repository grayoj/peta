import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";
import { JwtSecret } from "../helpers/constants";

export class AuthService {
  static async signup(
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
  ): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return this.generateToken(newUser._id);
  }

  static async login(email: string, password: string): Promise<string | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;

    return this.generateToken(user._id);
  }

  private static generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET || JwtSecret, {
      expiresIn: "1h",
    });
  }
}
