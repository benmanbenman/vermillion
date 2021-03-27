const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const favicon = require('serve-favicon')
const path = require('path')

const port = process.env.PORT || 3001;

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/', () => {
  app.use(express.static(path.join(__dirname, 'public')))
});

io.on('connection', (socket) => {
  console.log('connection!');
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    console.log(msg + ' ' +socket.id)
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});