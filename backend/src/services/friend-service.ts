import { ObjectId } from 'mongoose';

import Friend from '@models/friend-model';
import { FriendAlreadyExistsError, NoFriendError } from '@shared/errors';

const getAll = async (userId: ObjectId): Promise<Array<object>> => {
  return Friend.find().or([{ requester: userId }, { recipient: userId }]);
};

const exists = async (userId: ObjectId, friendId: ObjectId): Promise<boolean> => {
  return !!(await Friend.findOne().or([
    { requester: userId, recipient: friendId },
    { requester: friendId, recipient: userId }
  ]));
};

const addOne = async (requester: ObjectId, recipient: ObjectId): Promise<void> => {
  if (await exists(requester, recipient)) throw new FriendAlreadyExistsError();
  await Friend.create({ requester, recipient });
};

const deleteOne = async (userId: ObjectId, friendId: ObjectId): Promise<void> => {
  //todo: mesajlarda silinsin

  const friend = await Friend.findOne().or([
    { requester: userId, recipient: friendId },
    { requester: friendId, recipient: userId }
  ]);

  if (!friend) throw new NoFriendError();

  await Friend.findOneAndDelete({ _id: friend._id });
};

export default {
  getAll,
  exists,
  addOne,
  deleteOne
};
