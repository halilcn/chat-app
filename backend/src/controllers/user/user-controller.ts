import { Request, RequestHandler, Response } from 'express';

import handler from '@shared/handler';
import { TestError } from '@shared/errors';
import User from '@models/user-model';
import response from '@shared/response';

const index = handler(async (req, res, next) => {
  next(response.invalidInput());
});

export default { index };
