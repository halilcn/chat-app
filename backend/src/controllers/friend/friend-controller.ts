import { ObjectId } from 'mongoose';

import handler from '@shared/handler';
import Friend from '@models/friend-model';
import FriendService from '@services/friend-service';
import response from '@shared/response';
import UserService from '@services/user-service';

const index = handler(async (req, res, next) => {
  const friends = (await FriendService.getAll(req.user._id)).map((friend: any) => {
    return {
      _id: friend._id,
      userId: String(req.user._id) == String(friend.requester) ? friend.recipient : friend.requester
    };
  });
  const users = await UserService.getMany(friends.map(friend => friend.userId));

  friends.map((friend: any) => {
    friend.user = users.find((user: any) => String(user._id) == String(friend.userId));
    delete friend.userId;
  });

  next(response.success(friends));
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

const search = handler(async (req, res, next) => {
  const users = await UserService.search(req.user._id, req.query.value as string);
  const friendIds = (await FriendService.getAll(req.user._id)).map((friend: any) => [friend.requester, friend.recipient]).flat();

  users.map((user: any) => {
    user.isFriend = friendIds.some((friend: any) => String(friend._id) == String(user._id));
    return user;
  });

  next(response.success({ users }));
});

export default {
  index,
  store,
  destroy,
  search
};
