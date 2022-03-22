import { ObjectId } from 'mongoose';

import handler from '@shared/handler';
import Friend from '@models/friend-model';
import FriendService from '@services/friend-service';
import response from '@shared/response';

//todo:service names ?

const index = handler(async (req, res, next) => {
  res.send('okey');
});

const store = handler(async (req, res, next) => {
  const friendId = req.validated.recipient as ObjectId;
  const userId = req.user._id as ObjectId;

  await FriendService.addOne(userId, friendId);

  next(response.created());
});

export default {
  index,
  store
};
