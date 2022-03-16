import { Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcrypt';

import handler from '@shared/handler';
import { TestError } from '@shared/errors';
import User from '@models/user-model';
import response from '@shared/response';
import UserService from '@services/user-service';

const register = handler(async (req, res, next) => {
  const { validated } = req;
  validated.password = await bcrypt.hash(validated.password, 10);

  await UserService.createUser(validated);

  next(response.created());
});

export default {
  register
};
