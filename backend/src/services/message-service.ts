import { ObjectId } from 'mongoose';

import Message from '@models/message-model';

const getAll = async (friendId: ObjectId): Promise<Array<any>> => {
  const { messages } = await Message.findOne({ friendId }).lean();
  return messages;
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

const updateAsReadMessages = async (friendId: ObjectId, userId: ObjectId, messageIds: string[]): Promise<void> => {
  const messageModel = await Message.findOne({ friendId });

  messageModel.messages.map((message: any) => {
    if (messageIds.includes(String(message._id))) message.readers.push(userId);

    return message;
  });

  await messageModel.save();
};

export default {
  getAll,
  addOneEmpty,
  addOne,
  updateAsReadMessages
};
