import "reflect-metadata"; // needed by typeorm

import express, { NextFunction, Request, Response } from "express";

import { CarriersController } from "./controllers/carriers.controller";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import LoadsController from "./controllers/loads.controller";
import { RateLimiterOpts } from "./config";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

// defaults, security, rate-limiter
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit(RateLimiterOpts));

const loadsCtrl = new LoadsController();
app.use("/loads", loadsCtrl.routes());

const carriersCtrl = new CarriersController();
app.use("/carriers", carriersCtrl.routes());

// error middleware handler
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  ErrorMiddleware.handler(err, res);
  next();
});

export default app;
