import { Express } from 'express';
import { Socket } from 'socket.io';

interface IUsers {
  socketId: string;
  userId: string;
}

module.exports = (app: Express) => {
  const io = require('socket.io')(app);
  const users: IUsers[] = [];

  io.on('connection', function (socket: Socket) {
    socket.on('LOGIN', payload => {
      users.push({ socketId: socket.id, userId: payload.userId });
    });

    socket.on('disconnect', () => {
      //tood:!
      console.log(users.find((user: IUsers) => user.socketId == socket.id));
    });

    socket.on('JOIN_FRIEND_CHAT', friendRoomId => socket.join(friendRoomId));

    socket.on('LEAVE_FRIEND_CHAT', friendRoomId => socket.leave(friendRoomId));

    socket.on('LEAVE_FRIEND_CHAT', friendRoomId => socket.leave(friendRoomId));

    socket.on('START_TYPING', payload => io.to(payload.friendId).emit('USER_IN_WRITING_STATUS', payload.userId));

    socket.on('LEAVING_TYPING', payload => io.to(payload.friendId).emit('USER_IN_NOT_WRITING_STATUS', payload.userId));

    socket.on('SEND_MESSAGE', payload => io.to(payload.friendId).emit('MESSAGE', payload.message));
  });
};
