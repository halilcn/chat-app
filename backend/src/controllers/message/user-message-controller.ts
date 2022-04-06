import dayjs from 'dayjs';

import handler from '@shared/handler';
import response from '@shared/response';
import FriendService from '@services/friend-service';
import MessageService from '@services/message-service';
import UserService from '@services/user-service';

const index = handler(async (req, res, next) => {
  const userMessages: any = [];
  const userId = req.user._id;
  const friends = (await FriendService.getAll(userId)).map((friend: any) => {
    return {
      _id: friend._id,
      userId: String(req.user._id) == String(friend.requester) ? friend.recipient : friend.requester
    };
  });

  for (const friend of friends) {
    const user = await UserService.getOne(friend.userId);
    const messages = await MessageService.getAll(friend._id);

    const unReadMessagesCount = messages.sort((a: any, b: any) => {
      return dayjs(a.creaatedAt).isAfter(b.createdAt);
    });

    console.log(unReadMessagesCount);

    userMessages.push({
      user
    });
  }

  //
  //profil,adı,son mesaj,

  next(response.success({ messages: userMessages }));
});

export default {
  index
};
