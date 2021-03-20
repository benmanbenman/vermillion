const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const favicon = require('serve-favicon')
const path = require('path')

const port = process.env.PORT || 3001;

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('connection!');
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});