import axios, { Method, AxiosResponse, AxiosError } from 'axios';

interface RequestData {
  [key: string]: any;
}

interface AuthRequestConfig {
  method: Method;
  endpoint: string;
  data?: RequestData;
}

interface AuthRequestError {
  message: string;
  response?: AxiosResponse<any>;
}

export async function AuthRequest<T>({ method, endpoint, data }: AuthRequestConfig): Promise<T> {
  const apiUrl = `http://localhost:9000/api/v1${endpoint}`;
  const config = { method, url: apiUrl, data };

  try {
    const response = await axios(config);
    return response.data as T;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const authError: AuthRequestError = {
      message: `Error sending ${method} request to ${apiUrl}: ${axiosError.message}`,
    };

    if (axiosError.response) {
      authError.response = axiosError.response;
    }

    throw authError;
  }
}
