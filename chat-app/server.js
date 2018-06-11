const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('System', 'Welcome to the Chat app'));
  socket.broadcast.emit('newMessage', generateMessage('System', 'New user has been joined to chat room'));

  socket.on('createMessage', (message, callback) => {
    socket.broadcast.emit('newMessage', message);
    callback();
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
