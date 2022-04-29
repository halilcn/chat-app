import { Express } from 'express';
import { Socket } from 'socket.io';

interface IStartTyping {
  friendId: string;
  userId: string;
}

module.exports = (app: Express) => {
  const io = require('socket.io')(app);
  const users = [];

  io.on('connection', function (socket: Socket) {
    //todo:interfaces!
    socket.on('LOGIN', function (payload) {
      users.push({ socketId: socket.id, userId: payload.userId });
      console.log('LOGİN OK!!');
      console.log(socket.id);
      console.log(payload);
    });

    socket.on('disconnect', function () {
      console.log('bağlantı kesildi !!!!!');
      console.log(socket.id);
      //delete user!
    });

    socket.on('JOIN_FRIEND_CHAT', friendRoomId => socket.join(friendRoomId));

    socket.on('LEAVE_FRIEND_CHAT', friendRoomId => socket.leave(friendRoomId));

    socket.on('LEAVE_FRIEND_CHAT', friendRoomId => socket.leave(friendRoomId));

    socket.on('START_TYPING', function (data: IStartTyping) {
      io.to(data.friendId).emit('USER_IN_WRITING_STATUS', data.userId);
    });

    socket.on('LEAVING_TYPING', function (data: object) {
      io.to('62626516240ed528f8950e04').emit('MESSAGE', data);
    });

    //todo:!
    socket.on('SEND_MESSAGE', function (data: any) {
      io.to('62626516240ed528f8950e04').emit('MESSAGE', data);
    });
  });
};
