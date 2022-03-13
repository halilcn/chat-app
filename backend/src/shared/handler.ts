import { NextFunction } from 'express';

import response from '@shared/response';
import CustomError from '@shared/errors/custom-error';

interface IHandle {
  (handle: () => Promise<void>, next: NextFunction, customCatch?: (err: object | unknown) => boolean): Promise<void>;
}

const handler: IHandle = async (
  handle,
  next,
  customCatch = () => {
    return false;
  }
) => {
  try {
    await handle();
  } catch (err: any) {
    if (err && customCatch(err)) return;

    console.log(err.code);

    err instanceof CustomError ? next(response.error(err.message)) : next(response.error());
  }
};

export default handler;
