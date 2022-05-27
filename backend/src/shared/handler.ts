import { NextFunction, Request, Response } from 'express';

import response from '@shared/response';
import CustomError from '@shared/errors/custom-error';

interface IRouterParams {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

interface IHandler {
  (processFunction: IRouterParams): IRouterParams;
}

const handler: IHandler = processFunction => async (req, res, next) => {
  try {
    await processFunction(req, res, next);
  } catch (err) {
    err instanceof CustomError ? next(response.error(err.message, err.code)) : next(response.error());
  }
};

export default handler;
