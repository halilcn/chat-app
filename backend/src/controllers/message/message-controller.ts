import handler from '@shared/handler';
import response from '@shared/response';
import MessageService from '@services/message-service';
import { ObjectId } from 'mongoose';

const index = handler(async (req, res, next) => {
  const messages = await MessageService.getAll(req.params.friendId as unknown as ObjectId);

  next(response.success({ messages }));
});

const store = handler(async (req, res, next) => {
  //todo:readers nasıl update edilmeli ?
  //:todo: arkadaşlık kurulduğunda otomatik oluşsun.

  const test={
    authorId:req.user._id,
    content:req.validated.content,
  }

  await MessageService.addOne(req.params.friendId as unknown as ObjectId,test);

  next(response.created());
});

export default {
  index,
  store
};
