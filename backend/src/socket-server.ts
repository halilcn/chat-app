import { Express } from 'express';
import { Socket } from 'socket.io';

module.exports = (app: Express) => {
  const io = require('socket.io')(app);
  const users = [];

  io.on('connection', function (socket: Socket) {
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

    socket.on('SEND_MESSAGE', function (data: any) {
      io.to('62626516240ed528f8950e04').emit('MESSAGE', data);
    });
  });
};
