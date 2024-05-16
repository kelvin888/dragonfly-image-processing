import { type AxiosError } from "axios";

interface ResponseData {
  message?: string;
  // Add other properties if expected
}

export function parseError(error: AxiosError): string {
  if (error.response) {
    // Server responded with a non-2xx status code
    const responseData: ResponseData = error.response.data || {};
    const errorMessage =
      responseData.message || "An unknown server error occurred.";
    return errorMessage;
  } else if (error.request) {
    // Request made but no response received
    return "Unable to connect to the server. Please try again later.";
  } else {
    // Something happened in setting up the request
    return "An unknown error occurred. Please try again later.";
  }
}
