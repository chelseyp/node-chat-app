const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  // newMessage, createMessage
  var receivedMsg = {};

  socket.on('createMessage', (msg) => {
     receivedMsg = Object.assign({}, msg);
    console.log(msg);
  });

  socket.emit('newMessage', {
    from: receivedMsg.from,
    text: receivedMsg.text,
    createdAt: new Date().getTime()
  });
  

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`App is running at ${port}`);
});