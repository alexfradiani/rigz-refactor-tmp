/* eslint-disable quotes */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { RATE_LIMIT_WINDOW, RATE_LIMIT_MAX_REQUESTS } from '@config';
import { routes } from '@controllers';
import { ErrorMiddleware } from '@middlewares/error.middleware';


export const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

// configure security headers
app.use(helmet());

// rate limiter middleware
app.use(
  rateLimit({
    windowMs: Number.parseInt(RATE_LIMIT_WINDOW || '5') * 60 * 1000,
    max: Number.parseInt(RATE_LIMIT_MAX_REQUESTS || '100'),
    message: {
      status: 429,
      message: 'Too many requests, please try again later.'
    }
  })
);

// Prefix all routes
app.use((req, res, next) => {
  console.log('New %s %s %s', req.method, req.url, req.path)
  next();
});

app.use('/ping', (req,res) => {
  res.json('pong');
});

router.use(routes(router));

app.use('/api/v1', router);

// error middleware handler
app.use((err: any, _req: any, res: express.Response<any, Record<string, any>>, _next: any) => {
  ErrorMiddleware.handler(err, res);
});
