import axios from 'axios';

type ErrorResponseWithMessage = {
  message?: unknown;
};

export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (typeof responseData === 'string' && responseData.trim()) {
      return responseData;
    }

    const data = responseData as ErrorResponseWithMessage | undefined;
    if (data?.message != null) {
      return String(data.message);
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
