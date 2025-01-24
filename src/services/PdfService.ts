// @ts-ignore
import PDFServicesSdk from '@adobe/pdfservices-node-sdk';
import { File } from '../models/File';

export class PDFService {
  static async extractText(file: File): Promise<string> {
    try {
      const PDFServicesSdkTyped = PDFServicesSdk as any;

      const credentials = PDFServicesSdkTyped.Credentials.servicePrincipalCredentialsBuilder()
        .withClientId(process.env.PDF_SERVICES_CLIENT_ID)
        .withClientSecret(process.env.PDF_SERVICES_CLIENT_SECRET)
        .build();

      const executionContext = PDFServicesSdkTyped.ExecutionContext.create(credentials);

      const options = new PDFServicesSdkTyped.ExtractPDF.options.ExtractPdfOptions.Builder()
        .addElementsToExtract(PDFServicesSdkTyped.ExtractPDF.options.ExtractElementType.TEXT)
        .build();

      const extractPDFOperation = PDFServicesSdkTyped.ExtractPDF.Operation.createNew();

      const input = PDFServicesSdkTyped.FileRef.createFromLocalFile(
        file.path,
        PDFServicesSdkTyped.ExtractPDF.SupportedSourceFormat.pdf,
      );

      extractPDFOperation.setInput(input);
      extractPDFOperation.setOptions(options);

      let outputFilePath = createOutputFilePath();

      function createOutputFilePath() {
        const date = new Date();
        const dateString =
          date.getFullYear() +
          '-' +
          ('0' + (date.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + date.getDate()).slice(-2) +
          'T' +
          ('0' + date.getHours()).slice(-2) +
          '-' +
          ('0' + date.getMinutes()).slice(-2) +
          '-' +
          ('0' + date.getSeconds()).slice(-2);
        return 'output/extract-' + dateString + '.zip';
      }

      const result = await extractPDFOperation.execute(executionContext, {
        timeout: 1000000,
      });

      await result.saveAsFile(outputFilePath);

      return outputFilePath;
    } catch (error) {
      console.error('Error extracting text:', error);
      throw new Error('Error extracting text.');
    }
  }
}
