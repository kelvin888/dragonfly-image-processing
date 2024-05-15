import { ApiClientError } from "@/api/client";

export const handleError = (error: ApiClientError) => {
    let message = error.response.data.ErrorMessage;
    const errors = error.response.data.Errors.details;
    if (errors && errors.length) {
      message = "";
      errors.forEach((e: { message: any; }) => {
        message = `${e.message}, ${message}`;
      });
    }
    return message;
  };