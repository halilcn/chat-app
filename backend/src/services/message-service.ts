import { ObjectId } from 'mongoose';

import Friend from '@models/friend-model';
import { FriendAlreadyExistsError, NoFriendError } from '@shared/errors';
import Message from '@models/message-model';

const getAll = async (friendId: ObjectId): Promise<Array<object>> => {
  return Message.find({ friendId });
};

const addOne = async (friendId: ObjectId, messageInfo: object): Promise<void> => {
  await Message.create(messageInfo);
};

export default {
  getAll,
  addOne
};
