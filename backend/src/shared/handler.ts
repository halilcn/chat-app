import { NextFunction, Request, Response } from 'express';

import response from '@shared/response';
import CustomError from '@shared/errors/custom-error';


interface IProcessFunction {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

const handler = (processFunction: IProcessFunction) => async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    await processFunction(req, res, next);
  } catch (err) {
    err instanceof CustomError ? next(response.error(err.message)) : next(response.error());
  }
};

export default handler;
