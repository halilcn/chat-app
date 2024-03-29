import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

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

const deleteToken = async (userId: ObjectId, token: string): Promise<void> => {
  const user = await User.findOne({ _id: userId });

  user.tokens = user.tokens.filter((userToken: any) => userToken.token != token);
  await user.save();
};

const search = async (userId: ObjectId, search: string): Promise<Array<object>> => {
  return User.find({ username: { $regex: '.*' + search + '.*' }, _id: { $nin: userId } })
    .select('_id username image nameSurname')
    .lean();
};

const getOne = async (userId: ObjectId): Promise<object> => {
  return User.findOne({ _id: userId }).select('_id username image nameSurname lastActive').lean();
};

const getMany = async (userIds: Array<ObjectId>): Promise<Array<any>> => {
  return User.find({ _id: { $in: userIds } })
    .select('_id username image nameSurname')
    .lean();
};

export default {
  createUser,
  createToken,
  deleteToken,
  search,
  getOne,
  getMany
};
