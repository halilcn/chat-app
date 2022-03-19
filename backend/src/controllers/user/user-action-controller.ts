import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import handler from '@shared/handler';
import response from '@shared/response';
import UserService from '@services/user-service';
import User from '@models/user-model';
import { AuthenticationError, UsernameAlreadyExistsError } from '@shared/errors';

const register = handler(async (req, res, next) => {
  const { validated } = req;
  validated.password = await bcrypt.hash(validated.password, 10);

  if (await User.exists({ username: validated.username })) throw new UsernameAlreadyExistsError();

  await UserService.createUser(validated);

  next(response.created());
});

const login = handler(async (req, res, next) => {
  const { username, password } = req.validated;

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) throw new AuthenticationError();

  const token = await UserService.createToken(username);

  next(response.created({ token }));
});

export default {
  register,
  login
};
