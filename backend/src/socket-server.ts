import { Express } from 'express';
import { Socket } from 'socket.io';
import { ObjectId } from 'mongoose';
import dayjs, { Dayjs } from 'dayjs';

import socketChannels from './constants/socket-channels';
import UserSettingService from '@services/user-setting-service';

interface IUser {
  socketId: string;
  _id: string;
  isActive: boolean;
  lastActiveDate?: Dayjs;
}

module.exports = (app: Express) => {
  const io = require('socket.io')(app);
  let users: IUser[] = [];

  io.on('connection', function (socket: Socket) {
    socket.on(socketChannels.LOGIN, payload => {
      if (users.find((user: IUser) => user._id == payload.userId)) users = users.filter((user: IUser) => user._id != payload.userId);
      users.push({ socketId: socket.id, _id: payload.userId, isActive: true });

      io.emit(socketChannels.ACTIVE_USERS, users);
    });

    socket.on(socketChannels.DISCONNECT, async () => {
      const now = dayjs();
      let userId = null;

      users.find((user: IUser) => {
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

    socket.on(socketChannels.START_TYPING, payload => io.to(payload.friendId).emit(socketChannels.USER_IN_WRITING_STATUS, payload.userId));

    socket.on(socketChannels.LEAVING_TYPING, payload =>
      io.to(payload.friendId).emit(socketChannels.USER_IN_NOT_WRITING_STATUS, payload.userId)
    );

    socket.on(socketChannels.SEND_MESSAGE, payload => {
      const socketUser = users.find((user: IUser) => user._id == payload.message.toUserId);
      if (socketUser) io.to(socketUser.socketId).emit(socketChannels.LAST_MESSAGE_FROM_USER, payload.message);

      io.to(payload.friendId).emit(socketChannels.MESSAGE, payload.message);
    });

    socket.on(socketChannels.DELETE_MESSAGE, payload => {
      const socketFriend = users.find((user: IUser) => user._id == payload.friendUserId);
      const socketUser = users.find((user: IUser) => user._id == payload.userId);

      if (socketFriend) io.to(socketFriend.socketId).emit(socketChannels.DELETE_ALL_MESSAGES_BY_USER, payload);
      if (socketUser) io.to(socketUser.socketId).emit(socketChannels.DELETE_ALL_MESSAGES_BY_USER, payload);
    });
  });
};
