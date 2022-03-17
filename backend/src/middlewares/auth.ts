import jwt from 'jsonwebtoken';

import handler from '@shared/handler';
import User from '@models/user-model';
import response from '@shared/response';
import { AuthenticationError } from '@shared/errors';
import Logger from '@shared/logger';

interface IDecodedUser {
  user_id: string,
  iat: number
}

const auth=handler(async (req, res, next)=>{
  const reqToken = req.header("Authorization") as string;
  const decodedUser = jwt.verify(reqToken, process.env.JWT_TOKEN_KEY as string) as IDecodedUser;

  next()

  const user = await User.findById(decodedUser.user_id);

  if (!user) throw new AuthenticationError()

  const userHasToken = user.tokens.some(({ token }: any) => token == reqToken);
  if (!userHasToken) throw Error('Wrong user id');

  req.user = user;
  req.currentToken = reqToken;

  next();
})

export default auth;