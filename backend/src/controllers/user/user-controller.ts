import { RequestHandler } from 'express';

import handler from '@shared/handler';
import { TestError } from '@shared/errors';
import User from '@models/user-model';

const index: RequestHandler = (req, res, next) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  handler(
    async () => {
      throw new TestError();
    },
    next
  );
};

export default { index };
