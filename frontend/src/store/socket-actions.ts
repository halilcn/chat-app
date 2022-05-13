import { Socket } from 'socket.io-client';
import dayjs from 'dayjs';

import socketChannels from '@/store/socket-channels';
import authModule from '@/store/modules/auth';

interface ISendMessagePayload {
  toUserId: string;
  messages: object[];
  friendId: string;
}

const login = (socket: Socket, userId: string) => {
  socket.emit(socketChannels.LOGIN, { userId });
};

const sendMessage = (socket: Socket, { toUserId, messages, friendId }: ISendMessagePayload) => {
  const authorId = authModule.state.user._id;

  for (const message of messages) {
    const messageArgs = {
      ...message,
      toUserId,
      authorId,
      readers: [authorId],
      createdAt: dayjs()
    };

    socket.emit(socketChannels.SEND_MESSAGE, { friendId, message: messageArgs });
  }
};

const joinFriendChat = (socket: Socket, friendId: string) => {
  socket.emit(socketChannels.JOIN_FRIEND_CHAT, friendId);
};

const leaveFriendChat = (socket: Socket, friendId: string) => {
  socket.emit(socketChannels.LEAVE_FRIEND_CHAT, friendId);
};

const startTyping = (socket: Socket, friendId: string) => {
  socket.emit(socketChannels.START_TYPING, friendId);
};

const leavingTyping = (socket: Socket, friendId: string) => {
  socket.emit(socketChannels.LEAVING_TYPING, friendId);
};

export default {
  sendMessage,
  login,
  joinFriendChat,
  leaveFriendChat,
  startTyping,
  leavingTyping
};
