import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

import { CustomError } from '@shared/errors';
import routes from '@routes/index';

const app = express();

require('@middlewares/index.ts')(app);

app.use('/api', routes);

// Error handling
//todo:!
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
