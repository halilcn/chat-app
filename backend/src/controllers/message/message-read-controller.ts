import { ObjectId } from 'mongoose';

import handler from '@shared/handler';
import MessageService from '@services/message-service';

const store = handler(async (req, res, next) => {
  await MessageService.updateAsReadMessages(req.params.friendId as unknown as ObjectId, req.user._id, req.validated.messageIds);
});

export default {
  store
};
