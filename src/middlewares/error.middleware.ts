import { Response } from "express";

export class ErrorMiddleware {
  static handler(_err: unknown, res: Response): void {
    res.sendStatus(500); // unhandled error
  }
}

export type ErrorObj = {
  error: {
    name: string;
    message: string;
  };
};

export const apiError = (name: string, message: string): ErrorObj => {
  return {
    error: {
      name,
      message
    }
  };
};
