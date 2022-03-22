import { ObjectId } from 'mongoose';

import handler from '@shared/handler';
import Friend from '@models/friend-model';
import FriendService from '@services/friend-service';
import response from '@shared/response';

//todo:service names ?

const index = handler(async (req, res, next) => {
  const test = await FriendService.getAll(req.user._id);
  next(response.success(test));
});

const store = handler(async (req, res, next) => {
  const friendId = req.validated.recipient as ObjectId;
  const userId = req.user._id as ObjectId;

  await FriendService.addOne(userId, friendId);

  next(response.created());
});

const destroy = handler(async (req, res, next) => {
  await FriendService.deleteOne(req.user._id, req.params.friendId as unknown as ObjectId);

  next(response.success());
});

export default {
  index,
  store,
  destroy
};
