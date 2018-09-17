$(document).ready(function () {

});

$(function () {
  var socket = io();

  $('form').submit(function () {


    socket.emit('request help', msg, user, time);
    return false;
  });

  socket.on('broadcast', function (data) {
  })
});
