import express, { Router } from "express";
import { AuthController } from "../controller/AuthController";

const router: Router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

export default router;
