import { Request, Response } from 'express';

enum HttpStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

interface ApiError {
  status: HttpStatus;
  error: any;
}

const existMessage = (message: any): void => {
  if (!message) {
    const error: ApiError = { status: HttpStatus.BAD_REQUEST, error: `message not found` };
    throw error;
  }
};

export const main = (request: Request, response: Response): Response => {
  try {
    const message = request.query.message || request.body.message;

    existMessage(message);

    const result = {
      messageReceived: message,
    };

    return response.status(HttpStatus.SUCCESS).json(result);
  } catch (err) {
    const error = err as ApiError;
    return response.status(error.status).json(error);
  }
};
