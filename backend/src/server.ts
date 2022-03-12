import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import routes from './routes';
import { CustomError } from '@shared/errors';

const app = express();

require('middlewares')(app);

app.use('/api', routes);

// Error handling
app.use(
  (err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    console.error(err, true);
    const status =
      err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;
    return res.status(status).json({
      error: err.message
    });
  }
);

export default app;
