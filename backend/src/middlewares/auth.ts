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

    req.user = (await User.findById(decodedUser.user_id)) as object;
    req.currentToken = reqToken;

    const hasToken = req.user.tokens.some((userToken: any) => userToken.token == reqToken);
    if (!hasToken) new AuthenticationError();

    next();
  } catch (err) {
    throw new AuthenticationError();
  }
});

export default auth;
