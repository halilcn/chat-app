import { ObjectId } from 'mongoose';

import { FriendAlreadyExistsError, NoFriendError } from '@shared/errors';
import Message from '@models/message-model';

const getAll = async (friendId: ObjectId): Promise<Array<object>> => {
  return Message.find({ friendId });
};

export default {
  getAll,
};
