import { ObjectId } from 'mongoose';
import dayjs from 'dayjs';

import Message from '@models/message-model';

const getAll = async (friendId: ObjectId): Promise<Array<any>> => {
  const { messages } = await Message.findOne({ friendId }).lean();
  return messages.sort((a: any, b: any) => (dayjs(b.creaatedAt).isAfter(a.createdAt) ? -1 : 1));
};

const addOneEmpty = async (friendId: ObjectId): Promise<void> => {
  const notExistsMessageList = !(await Message.exists({ friendId }));
  if (notExistsMessageList) await Message.create({ friendId });
};

const addOne = async (friendId: ObjectId, messageInfos: object): Promise<void> => {
  const messageModel = await Message.findOne({ friendId });
  messageModel.messages.push(messageInfos);

  await messageModel.save();
};

export default {
  getAll,
  addOneEmpty,
  addOne
};
