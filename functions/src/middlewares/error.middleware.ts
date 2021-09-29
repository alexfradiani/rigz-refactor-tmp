import { Response } from "express";

export class ErrorMiddleware {
  static handler(err: unknown, res: Response): void {
    if (err instanceof ApiError) {
      res.status(500); // Check with Alex
      res.send(err);
    } else {
      res.sendStatus(500); // other unhandled error
    }
  }
}

export class ApiError extends Error {
  constructor(name: string, message: string, stack: string) {
    super(message);
    // this.status = status; Check with Alex
    this.name = name;
    this.message = message;
    this.stack = stack;
  }
}
