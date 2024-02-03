import * as express from "express";
import { AuthService } from "../services/AuthService";
import { UserModel } from "../models/UserModel";

export class AuthController {
  static async signup(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    try {
      const { firstname, lastname, username, email, password } = req.body;

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      await AuthService.signup(firstname, lastname, username, email, password);

      res.status(201).json({ message: "Signup successful" });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      const user = await UserModel.findOne({ email });

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      const userId = user._id;

      if (!token) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const { firstname, lastname } = user;

      res.status(200).json({ userId, token, firstname, lastname, email });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
