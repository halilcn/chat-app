import { ObjectId } from 'mongoose';

import Friend from '@models/friend-model';
import { FriendAlreadyExistsError } from '@shared/errors';

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

export default {
  exists,
  addOne
};
