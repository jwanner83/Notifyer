// Setup basic express server
var express = require('express')
var app = express()
var path = require('path')
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var port = process.env.PORT || 3000

server.listen(port, function(){
    console.log('Erreichbar ufem Port ' + port)
});

// Routing
app.use(express.static(path.join(__dirname, 'public')))

// Chatroom
io.on('connection', function(socket){
    // when the client emits 'chat message', this listens and executes
    socket.on('request help', function(msg, role, time, room, requestId, status){
        console.log("help is requested: " + msg + ', ' + role + ', ' + time + ', ' + room + ', ' + requestId + ', ' + status)
        io.emit('request help', msg, role, time, room, requestId, status)
    })
})