import express, { Router, Response } from "express";
import { AuthController } from "../controller/AuthController";
import multer from "multer";
import { authenticate } from "../libs/middleware/authentication";
import { CustomRequest, PDFController } from "../controller/PdfController";

const router: Router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/secure", authenticate, (_req, res) => {
  res.status(200).json({ message: "Secure route accessed successfully" });
});

router.post(
  "/process-pdf",
  authenticate,
  upload.single("pdfFile"),
  (req: CustomRequest<Express.Multer.File>, res: Response) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No PDF file uploaded." });
    }
    PDFController.processPDF(req, res);
    return;
  },
);

export default router;
