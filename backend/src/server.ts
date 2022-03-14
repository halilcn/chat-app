import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

import { CustomError } from '@shared/silinecek';
import routes from '@routes/index';

const app = express();

require('@middlewares/index.ts')(app);

app.use('/api', routes);

// Error handling
//todo:!
app.use(
  (err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    //todo: http code !

    res.locals.message = err.message;
    res.locals.error = process.env.APP_ENVIRONMENT === 'development' ? err : {};

    // Write a log if there is an error
   // if (String(err.status).split('')[0] != '2') logger.warn({ ...err });

    if (process.env.APP_ENVIRONMENT !== 'development') delete err['stack'];

    console.log(err);
    res.status(400).send({ ...err });
  }
);

export default app;
