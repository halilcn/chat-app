import { ObjectId } from 'mongoose';

import Message from '@models/message-model';

const getAll = async (friendId: ObjectId): Promise<Array<object>> => {
  const userMessage = await Message.findOne({ friendId }).lean();
  return userMessage.messages;
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
