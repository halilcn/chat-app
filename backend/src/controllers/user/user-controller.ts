import { Request, RequestHandler, Response } from 'express';

import handler from '@shared/handler';
import { TestError } from '@shared/errors';
import User from '@models/user-model';

/*
* const index: RequestHandler = (req, res, next) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  handler(
    async () => {
      res.send('ok')
      throw new TestError();
    },
    next
  );
};
*/

const index = handler(async (req: any, res: any, next: any) => {
  res.send('okey!');
});

const test = handler(async (req: Request, res: Response, next: any) => {
  throw new TestError();
});

export default { index, test };
