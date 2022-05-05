import { Express } from 'express';
import { Socket } from 'socket.io';

import socketChannels from './constants/socket-channels';

interface IUsers {
  socketId: string;
  userId: string;
  isActive: boolean;
  lastActiveDate?: string;
}

module.exports = (app: Express) => {
  const io = require('socket.io')(app);
  let users: IUsers[] = [];

  io.on('connection', function (socket: Socket) {
    socket.on(socketChannels.LOGIN, payload => users.push({ socketId: socket.id, userId: payload.userId, isActive: true }));

    socket.on(socketChannels.DISCONNECT, () => (users = users.filter((user: IUsers) => user.socketId != socket.id)));

    socket.on(socketChannels.JOIN_FRIEND_CHAT, friendRoomId => socket.join(friendRoomId));

    socket.on(socketChannels.LEAVE_FRIEND_CHAT, friendRoomId => socket.leave(friendRoomId));

    socket.on(socketChannels.START_TYPING, payload => io.to(payload.friendId).emit('USER_IN_WRITING_STATUS', payload.userId));

    socket.on(socketChannels.LEAVING_TYPING, payload => io.to(payload.friendId).emit('USER_IN_NOT_WRITING_STATUS', payload.userId));

    socket.on(socketChannels.SEND_MESSAGE, payload => io.to(payload.friendId).emit('MESSAGE', payload.message));
  });
};
