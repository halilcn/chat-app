import { Express } from 'express';

module.exports = (app: Express) => {
  const io = require('socket.io')(app);

  io.on('connection', function (socket: any) {
    console.log('bağlandı socket !!!!!');
    console.log(socket.id);
    socket.on('SEND_MESSAGE', function (data: any) {
      io.emit('MESSAGE', data);
    });
  });

  io.on('disconnect', function (socket: any) {
    console.log('bağlantı kesildi !!!!!');
    console.log(socket.id);
  });
};
