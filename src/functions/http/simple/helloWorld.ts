import { Request, Response } from 'express';

import { config } from '../../../config';
import { getPubSubClient, sendMessageToPubSub } from '../../../utils/pubsub';

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

export const helloWorldHttp = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { projectId, pubsub } = config.google;
    const message = request.query.message || request.body.message;
    const clientMessagesTopic = pubsub.topics.clientMessages;

    existMessage(message);

    const data = {
      clientMessage: message,
    };

    const pubsubClient = getPubSubClient(projectId);
    const messageId = await sendMessageToPubSub(pubsubClient, data, clientMessagesTopic);

    const result = {
      ...data,
      messageId,
    };
    return response.status(HttpStatus.SUCCESS).json(result);
  } catch (err) {
    const error = err as ApiError;
    return response.status(error.status).json(error);
  }
};
