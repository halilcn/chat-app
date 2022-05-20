import handler from '@shared/handler';
import response from '@shared/response';
import MessageService from '@services/message-service';
import { ObjectId } from 'mongoose';

const store = handler(async (req, res, next) => {
  await MessageService.updateAsReadMessages(req.params.friendId as unknown as ObjectId, req.user._id, req.validated.messageIds);
});

export default {
  store
};
