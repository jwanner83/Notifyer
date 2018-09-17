var role;
var room;

$(function () {
    var socket = io();

    $('form').submit(function () {
    var message = $("#m");
    var newTime = new Date();
    var time = newTime.getHours() + ':' + newTime.getMinutes() + ':' + newTime.getSeconds() + ':' + newTime.getMilliseconds();

    socket.emit('request help', message.val(), role, time, room);
        message.val('');
        return false;
    });

    socket.on('request help', function(requestMsg, requestRole, requestTime, requestRoom) {
        if (requestRoom === room) {
            $('#message-container').html("<p>Nachricht: " + requestMsg + ", Angefordert von: " + requestRole + ", Zeit: " + requestTime + ", Raum: " + requestRoom + "</p>")
        }
    });
});

function getInfos() {
    role = $('input[name=role]:checked').val();
    room = $('#room').val();

    if (role === undefined) {
        $('.role-collector').css("color", "red");
    } else {
        if (room === "") {
            $('.room-collector').css("color", "red");
        } else {
            $(".input-container").addClass(role)
            $(".collector").fadeOut();
        }
    }
}
