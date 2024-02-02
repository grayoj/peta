import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { firstname, lastname, username, email, password } = req.body;
      const token = await AuthService.signup(
        firstname,
        lastname,
        username,
        email,
        password,
      );
      res.status(201).json({ token });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      if (!token) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      res.status(200).json({ token, email });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
