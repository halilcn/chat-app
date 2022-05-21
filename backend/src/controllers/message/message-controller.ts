import handler from '@shared/handler';
import response from '@shared/response';
import MessageService from '@services/message-service';
import { ObjectId } from 'mongoose';

const index = handler(async (req, res, next) => {
  const messages = await MessageService.getAll(req.params.friendId as unknown as ObjectId);

  next(response.success({ messages }));
});

const store = handler(async (req, res, next) => {
  const { messages } = req.validated;

  for (const message of messages) {
    const messageInfos = {
      authorId: req.user._id,
      content: message.content,
      type: message.type,
      readers: [req.user._id]
    };

    await MessageService.addOne(req.params.friendId as unknown as ObjectId, messageInfos);
  }

  next(response.created());
});

const destroy = handler(async (req, res, next) => {
  await MessageService.deleteAllMessages(req.params.friendId as unknown as ObjectId);

  next(response.success());
});

export default {
  index,
  store,
  destroy
};
