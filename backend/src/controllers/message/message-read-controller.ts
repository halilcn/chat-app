import { ObjectId } from 'mongoose';

import handler from '@shared/handler';
import MessageService from '@services/message-service';
import response from '@shared/response';

const store = handler(async (req, res, next) => {
  await MessageService.updateAsReadMessages(req.params.friendId as unknown as ObjectId, req.user._id, req.validated.messageIds);

  next(response.created());
});

export default {
  store
};
