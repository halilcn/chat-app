import { ObjectId } from 'mongoose';

import Friend from '@models/friend-model';
import { FriendAlreadyExistsError, NoFriendError } from '@shared/errors';
import Message from '@models/message-model';
import MessageService from '@services/message-service';

const getOne = async (userId: ObjectId, friendUserId: ObjectId): Promise<{ [key: string]: any }> => {
  return Friend.findOne().or([
    { requester: userId, recipient: friendUserId },
    { requester: friendUserId, recipient: userId }
  ]);
};

const getAll = async (userId: ObjectId): Promise<Array<object>> => {
  return Friend.find()
    .or([{ requester: userId }, { recipient: userId }])
    .lean();
};

const exists = async (userId: ObjectId, friendUserId: ObjectId): Promise<boolean> => {
  return !!(await getOne(userId, friendUserId));
};

const addOne = async (requester: ObjectId, recipient: ObjectId): Promise<void> => {
  if (await exists(requester, recipient)) throw new FriendAlreadyExistsError();
  const friend = await Friend.create({ requester, recipient });
  await MessageService.addOneEmpty(friend._id);
};

const deleteOne = async (userId: ObjectId, friendUserId: ObjectId): Promise<void> => {
  const friend = await getOne(userId, friendUserId);

  if (!friend) throw new NoFriendError();

  await Message.deleteOne({ friendId: friend._id });
  await Friend.findOneAndDelete({ _id: friend._id });
};

export default {
  getOne,
  getAll,
  exists,
  addOne,
  deleteOne
};
