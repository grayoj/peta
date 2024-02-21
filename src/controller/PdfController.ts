import { Request, Response } from "express";
import { File } from "../models/File";
import { PDFService } from "../services/PdfService";
import { OpenAIService } from "../services/OpenaiService";

export type CustomRequest<T> = Request & { file?: T };

type CustomResponse<T> = Response & {
  json: (body: T) => CustomResponse<T>;
};

/**
 * It’s a module augmentation to extend the types defined in express.
 * As you see I am extending the response interface to include a custom json method that will return the instance of the response itself.
 * So now the json method returns the correct type. *
 *
 **/

declare module "express" {
  interface Response {
    json: (body: any) => this;
  }
}

interface ProcessedPDFResponse {
  extractedText: string;
  creditReport: string;
  error?: string;
}

export class PDFController {
  static async processPDF(
    req: CustomRequest<Express.Multer.File>,
    res: CustomResponse<ProcessedPDFResponse>,
  ): Promise<void> {
    try {
      const file: File | undefined = req.file as File | undefined;
      if (!file) {
        res.status(400).json({ error: "No PDF file uploaded." });
        return;
      }

      const extractedText: string = await PDFService.extractText(file);

      const financialData: any = req.body.financialData;
      const creditReport: string =
        await OpenAIService.generateCreditReport(financialData);

      res.status(200).json({ extractedText, creditReport });
    } catch (error) {
      console.error("Error processing PDF:", error);
      res.status(500).json({ error: "Error processing PDF." });
    }
  }
}
