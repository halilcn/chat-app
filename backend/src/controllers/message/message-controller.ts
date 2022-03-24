import handler from '@shared/handler';
import response from '@shared/response';
import MessageService from '@services/message-service';
import { ObjectId } from 'mongoose';

const index = handler(async (req, res, next) => {
  const messages = await MessageService.getAll(req.params.friendId as unknown as ObjectId);
  next(response.success({ messages }));
});

export default {
  index
};
