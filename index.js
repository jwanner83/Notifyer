// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var count = 0;
var reason;

server.listen(port, function(){
  console.log('Erreichbar ufem Port ' + port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom
io.on('connection', function(socket){
  // when the client emits 'chat message', this listens and executes
  socket.on('chat message', function(msg, user, usercolorOne, usercolorTwo, time, date){
    io.emit('chat message', msg, user, usercolorOne, usercolorTwo, time, reason);
  });

  socket.on('request help', function(msg, user, time){
    io.emit('request help', msg, user, time);
  });


  socket.on('get messages', function(user) {
  });

  io.sockets.emit('broadcast', count);

  socket.on('disconnect', function (data) {
    count--;
    io.sockets.emit('broadcast', count)
  });
});