import handler from '@shared/handler';
import response from '@shared/response';
import MessageService from '@services/message-service';
import { ObjectId } from 'mongoose';

const index = handler(async (req, res, next) => {
  //todo:readers nasıl update edilmeli ?

  const messages = await MessageService.getAll(req.params.friendId as unknown as ObjectId);

  next(response.success({ messages }));
});

const store = handler(async (req, res, next) => {
  const messageInfos = {
    authorId: req.user._id,
    content: req.validated.content,
    type: req.validated.type
  };

  await MessageService.addOne(req.params.friendId as unknown as ObjectId, messageInfos);

  next(response.created());
});

export default {
  index,
  store
};
