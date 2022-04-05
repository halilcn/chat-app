import './pre-start';

import server from './server';
import logger from '@shared/logger';

const port = process.env.PORT || 3000;

server.listen(port, () => {
  logger.info(`Express server started on port ${port}`);
});

/*const PORT = process.env.PORT || 3000

const socketIO = require('socket.io')
const express = require('express')

const app = express()
const server = app.listen(PORT, () => {
  console.log('SERVER LISTENING ON PORT http://localhost:3000')
})
const io = socketIO(server)


io.on('connection', function (socket: any) {
  console.log(socket.id);
  socket.on('SEND_MESSAGE', function (data: any) {
    console.log('socket geldi !!!!');
    console.log(data);
    io.emit('MESSAGE', data);
  });
});*/
