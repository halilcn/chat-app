import { NextFunction } from 'express';

import response from '@shared/response';
import CustomError from '@shared/errors/custom-error';
import logger from '@shared/logger';

interface IHandle {
  (
    handle: () => Promise<void>,
    next: NextFunction,
    customCatch?: (err: object | unknown) => boolean
  ): Promise<void>;
}

const handle: IHandle = async (
  handle,
  next,
  customCatch = () => {
    return false;
  }
) => {
  try {
    await handle();
  } catch (err: any) {
    if (err) if (customCatch(err)) return;

    console.log(typeof err);

    err.name == CustomError.name
      ? next(response.error(err.message))
      : next(response.error());
  }
};

export default handle;
