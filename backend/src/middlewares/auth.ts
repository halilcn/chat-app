import jwt from 'jsonwebtoken';

import handler from '@shared/handler';
import User from '@models/user-model';
import { AuthenticationError } from '@shared/errors';

interface IDecodedUser {
  user_id: string;
  iat: number;
}

const auth = handler(async (req, res, next) => {
  try {
    const reqToken = req.header('Authorization') as string;

    const decodedUser = jwt.verify(reqToken, process.env.JWT_TOKEN_KEY as string) as IDecodedUser;
    const user = await User.findById(decodedUser.user_id);

    req.user = user;
    req.currentToken = reqToken;

    next();
  } catch (err) {
    throw new AuthenticationError();
  }
});

export default auth;
