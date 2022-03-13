import { RequestHandler } from 'express';

import handle from '@shared/handle';
import { TestError } from '@shared/errors';

const index: RequestHandler = (req, res, next) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  handle(async () => {
    res.send('asdsa');

    throw new TestError();
  }, next);
};

export default { index };
