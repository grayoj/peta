import axios, { AxiosResponse } from 'axios';

export class OpenAIService {
  static async generateCreditReport(financialData: any): Promise<string> {
    try {
      const instruction: string = `Give a credit report based on the provided financial data: ${JSON.stringify(
        financialData,
      )}`;
      const response: AxiosResponse<any> = await axios.post(
        process.env.OPENAI_API_URL || '',
        {
          prompt: `${instruction}`,
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const creditReport: string = response.data.choices[0].text;
      return creditReport;
    } catch (error) {
      console.error('Error generating credit report:', error);
      throw new Error('Error generating credit report');
    }
  }
}
