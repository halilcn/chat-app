import { Express } from 'express';

module.exports = (app: Express) => {
  const io = require('socket.io')(app);

  io.on('connection', function (socket: any) {
    socket.on('LOGIN', function () {
      console.log('LOGİN OK!!');
      console.log(socket.id);
    });

    socket.on('disconnect', function () {
      console.log('bağlantı kesildi !!!!!');
      console.log(socket.id);
    });

    socket.on('SEND_MESSAGE', function (data: any) {
      io.emit('MESSAGE', data);
    });
  });

};
