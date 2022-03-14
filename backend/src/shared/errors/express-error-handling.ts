import { NextFunction, Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';

interface IError extends Error {
  status?: number;
}

export default (err: IError, _: Request, res: Response, __: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = process.env.APP_ENVIRONMENT === 'development' ? err : {};

  if (process.env.APP_ENVIRONMENT !== 'development') delete err['stack'];

  res.status(err.status ?? httpStatusCode.BAD_REQUEST).send({ ...err });
};
