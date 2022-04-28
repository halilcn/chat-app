import { Express } from 'express';
import { Socket } from 'socket.io';

module.exports = (app: Express) => {
  const io = require('socket.io')(app);
  const users = [];

  io.on('connection', function (socket: Socket) {
    socket.on('LOGIN', function (payload) {
      console.log('LOGİN OK!!');
      console.log(socket.id);
      console.log(payload);
    });

    socket.on('disconnect', function () {
      console.log('bağlantı kesildi !!!!!');
      console.log(socket.id);
    });

    socket.on('JOIN_FRIEND_CHAT', friendId => {
      console.log('joined room ' + friendId);
      socket.join(friendId);
    });

    socket.on('LEAVE_FRIEND_CHAT', friendId => {
      console.log('leaved room ' + friendId);
      socket.leave(friendId);
    });

    socket.on('SEND_MESSAGE', function (data: any) {
      console.log('message sa');
      console.log(data);
      //console.log(io.sockets.adapter.rooms);

      socket.to('62626516240ed528f8950e04').emit('MESSAGE', data);

      //socket.leave()
      //io.emit('MESSAGE', data);
    });
  });
};
