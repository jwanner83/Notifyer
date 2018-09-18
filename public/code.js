var role
var room

// Active Request
var requestIsActive = false
var ar_message
var ar_role
var ar_time
var ar_room
var ar_requestId
var ar_status

var notification

$(document).ready(function () {
    checkIfRequestIsActive();
    $(".loading").fadeIn();

    setTimeout(function () {
        $(".loading img").css({
          "top": "25%",
          "height": "80px",
          "width": "80px"
        })

        $(".collector").fadeIn();
    }, 1200)

    Notification.requestPermission().then(function(result) {
      console.log(result);
    });
})

$(function () {
    var socket = io()

    $('form').submit(function () {
        if (role === "Schnuppi") {
            var message = $("#m")
            var newTime = new Date()
            var time = newTime.getHours() + ':' + newTime.getMinutes();
            var requestId = getRandomInt(1, 1000000000);
            var status = "new"

            socket.emit('request help', message.val(), role, time, room, requestId, status)
            message.val('')
            requestIsActive = true

            checkIfRequestIsActive();

            return false
        } else {
            ar_status = "On Se Way"
            socket.emit('request help', ar_message, ar_role, ar_time, ar_room, ar_requestId, ar_status)
            return false
        }
    })

    socket.on('request help', function(requestMsg, requestRole, requestTime, requestRoom, requestedId, requestStatus) {
        if (requestRoom === room) {
            requestIsActive = true
            ar_message = requestMsg
            ar_role = requestRole
            ar_time = requestTime
            ar_room = requestRoom
            ar_requestId = requestedId
            ar_status = requestStatus

            if (role === "Schnuppi") {
              if (requestStatus === "new") {
                $('#message-container').html("<div class='request s-new-request'><h1>Your request has been sent</h1></div>")
              } else {
                $('#message-container').html("<div class='request s-old-request'><h1>Help is on the way</h1></div>")
              }
            } else {
              if (requestStatus === "new") {
                $('#message-container').html("<div class='request b-new-request'><h1>Your Schnuppi needs Help!</h1><p>" + requestMsg + "</p>" + requestTime + "</div>")
              } else {
                $('#message-container').html("<div class='request b-old-request'><h1>You are on your way</h1></div>")
              }
            }

            Notification.requestPermission().then(function(result) {
                if (result === "granted") {
                    if (requestStatus === "new") {
                        if (role === "Betreuer") {
                            let title = "Your Schnuppi needs help! " + requestMsg
                            notification = new Notification(title, {body: "Request created: " + requestTime});
                        }
                    } else {
                        if (role === "Schnuppi") {
                            notification = new Notification('Wait a second!', {body: "Don't worry, help is on the way!"});
                            setTimeout(notification.close.bind(notification), 10000);
                        }
                    }
                }
            });

            checkIfRequestIsActive();
        }
    })
})

function getInfos() {
    role = $('input[name=role]:checked').val()
    room = $('#room').val()

    if (role === undefined) {
        $('.role-collector h1').css("color", "red")
        if (room === "") {
            $('.room-collector h1').css("color", "red")
        }
    } else {
        if (room === "") {
            $('.room-collector h1').css("color", "red")
        } else {
            $(".input-container").addClass(role)

            $(".loading img").css({
              "top" : "0",
              "right" : "0",
              "transform" : "translate(200%, 27%)",
              "height": "40px",
              "width": "40px"
            })

            $(".collector").fadeOut();
            $(".chat-wrapper").fadeIn();
        }
    }
}

function checkIfRequestIsActive() {
    if (requestIsActive) {
        $(".button.Betreuer").attr('disabled', false);
        $(".button.Schnuppi").attr('disabled', true);
    } else {
        $(".button.Betreuer").attr('disabled', true);
        $(".button.Schnuppi").attr('disabled', false);
    }

    if (ar_status === "On Se Way") {
        $(".button.Betreuer").attr('disabled', true);
        $(".button.Schnuppi").attr('disabled', true);

        setTimeout(function () {
            $(".request").remove()
            requestIsActive = false
            ar_message = undefined
            ar_role = undefined
            ar_time = undefined
            ar_room = undefined
            ar_requestId = undefined
            ar_status = undefined
            checkIfRequestIsActive()
        }, 10000)
    }
}