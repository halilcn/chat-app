import { Socket } from 'socket.io-client';
import dayjs from 'dayjs';

import socketChannels from '@/store/socket-channels';
import authModule from '@/store/modules/auth';

const sendMessage = (socket: Socket, messages: object[]): void => {
  const authorId = authModule.state.user._id;

  for (const message of messages) {
    const messageArgs = {
      ...message,
      authorId,
      readers: [authorId],
      createdAt: dayjs()
    };

    socket.emit(socketChannels.SEND_MESSAGE, messageArgs);
  }
};

export default {
  sendMessage
};
