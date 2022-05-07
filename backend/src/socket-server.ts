import { Express } from 'express';
import { Socket } from 'socket.io';

import socketChannels from './constants/socket-channels';
import dayjs, { Dayjs } from 'dayjs';
import UserSettingService from '@services/user-setting-service';
import { ObjectId } from 'mongoose';

interface IUsers {
  socketId: string;
  _id: string;
  isActive: boolean;
  lastActiveDate?: Dayjs;
}

module.exports = (app: Express) => {
  const io = require('socket.io')(app);
  let users: IUsers[] = [];

  io.on('connection', function (socket: Socket) {
    socket.on(socketChannels.LOGIN, payload => {
      if (users.find((user: IUsers) => user._id == payload.userId)) users = users.filter((user: IUsers) => user._id != payload.userId);
      users.push({ socketId: socket.id, _id: payload.userId, isActive: true });

      io.emit(socketChannels.ACTIVE_USERS, users);
    });

    socket.on(socketChannels.DISCONNECT, async () => {
      const now = dayjs();
      let userId = null;

      users.find((user: IUsers) => {
        if (user.socketId == socket.id) {
          userId = user._id;
          user.isActive = false;
          user.lastActiveDate = now;
        }
      });

      io.emit(socketChannels.ACTIVE_USERS, users);

      await UserSettingService.update(userId as unknown as ObjectId, { lastActive: dayjs() });
    });

    socket.on(socketChannels.JOIN_FRIEND_CHAT, friendRoomId => socket.join(friendRoomId));

    socket.on(socketChannels.LEAVE_FRIEND_CHAT, friendRoomId => socket.leave(friendRoomId));

    socket.on(socketChannels.START_TYPING, payload => io.to(payload.friendId).emit('USER_IN_WRITING_STATUS', payload.userId));

    socket.on(socketChannels.LEAVING_TYPING, payload => io.to(payload.friendId).emit('USER_IN_NOT_WRITING_STATUS', payload.userId));

    socket.on(socketChannels.SEND_MESSAGE, payload => io.to(payload.friendId).emit('MESSAGE', payload.message));
  });
};
