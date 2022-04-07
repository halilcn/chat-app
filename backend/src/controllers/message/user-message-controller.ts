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
    let unReadMessagesCount = 0;
    const user = await UserService.getOne(friend.userId);
    const messages = await MessageService.getAll(friend._id);

    if (messages.length === 0) continue;

    for (const message of messages) {
      if (message.readers.includes(userId)) break;
      unReadMessagesCount++;
    }

    userMessages.push({
      user,
      unReadMessagesCount,
      friendId: friend._id,
      lastMessage: {
        content: messages[0].content,
        createdAt: messages[0].createdAt
      }
    });
  }

  next(response.success({ messages: userMessages }));
});

export default {
  index
};
