import jwt from 'jsonwebtoken';

import User from '@models/user-model';

const createUser = async (user: object): Promise<void> => {
  await User.create(user);
};

const createToken = async (username: string): Promise<string> => {
  const user = await User.findOne({ username });
  const token = jwt.sign({ user_id: user._id }, process.env.JWT_TOKEN_KEY as string);

  user.tokens.push({ token });
  await user.save();

  return token;
};

export default {
  createUser,
  createToken
};
