// Server side
var io = require('socket.io').listen(3000);

io.sockets.on('connection', function (socket) {
  //console.log('connect count :' + count);
  //console.log('connected');
  // Broadcast
  socket.on('video', function (data) {
    socket.broadcast.emit('video', data);
  });
});
