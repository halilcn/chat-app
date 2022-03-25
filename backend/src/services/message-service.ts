import { ObjectId } from 'mongoose';

import Friend from '@models/friend-model';
import { FriendAlreadyExistsError, NoFriendError } from '@shared/errors';
import Message from '@models/message-model';

const getAll = async (friendId: ObjectId): Promise<Array<object>> => {
  return Message.find({ friendId });
};

const addOneEmpty = async (friendId: ObjectId): Promise<void> => {
  const notExistsMessageList = !(await Message.exists({ friendId }));
  if (notExistsMessageList) await Message.create({ friendId });
};

const addOne = async (friendId: ObjectId, messageInfos: object): Promise<void> => {
  await Message.create(messageInfos);
};

export default {
  getAll,
  addOneEmpty,
  addOne
};
