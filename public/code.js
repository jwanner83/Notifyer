let room;
let role;
let requestIsActive = false;

let ar_message
let ar_role
let ar_time
let ar_room
let ar_requestId
let ar_status

let notification

$(document).ready(function () {
    checkInput(".room-input");
    checkIfReady();
});

function start() {
  $(".notifyer-title").css({
    "margin-top" : "-200px",
    "opacity" : "0"
  });

  $(".start-button").css({
    "opacity" : "0"
  });

  setTimeout(function () {
    $(".start").hide();
    $(".collector").addClass("collect");
    $(".form").fadeIn();
    $(".form").css("display", "grid");
  }, 500)
}

function setRole(roleSet) {
    role = roleSet;

    $(".role-item").removeClass("active");
    $("#" + role).addClass("active");

    checkIfReady();
}

function setRoom() {
  room = $(".room-input").val();
}

function startConnection() {
  setRoom();
  $(".form").fadeOut();

  checkIfRequestIsActive();

  $(".message-wrapper").fadeIn();
  $(".message-wrapper").css("display", "grid");

  if (role === "user") {
    $(".message-input").fadeIn();
    $(".message-button").fadeIn();

    $(".message-wrapper").addClass("user");
  } else {
    $(".help-button").fadeIn();
      $(".message-wrapper").addClass("supporter");
  }
}

$('.room-input').on("input", function () {
    checkInput(".room-input");
    checkIfReady();
});

function checkInput(inputclass) {
  if($(inputclass).val()) {
      $(inputclass).addClass("active");
  } else {
      $(inputclass).removeClass("active");
  }
}

function checkIfReady() {
    if ($(".role-item").hasClass("active")) {
        if ($(".room-input").hasClass("active")) {
            $(".send-infos button").removeAttr("disabled");
            $(".send-infos button").attr("onclick", "startConnection();");
        } else {
            $(".send-infos button").attr("disabled", "disabled")
        }
    } else {
      $(".send-infos button").attr("disabled", "disabled")
    }

}


$(function () {
  var socket = io()

  $('.form-button button').click(function () {
    if (role === "user") {
      let message = $("#message")
      let newTime = new Date()
      let time = newTime.getHours() + ':' + newTime.getMinutes();
      let requestId = getRandomInt(1, 1000000000);
      let status = "new";

      socket.emit('request help', message.val(), role, time, room, requestId, status)
      message.val('')
      requestIsActive = true

      checkIfRequestIsActive();
    } else {
      ar_status = "On Se Way"
      socket.emit('request help', ar_message, ar_role, ar_time, ar_room, ar_requestId, ar_status)
      return false
    }
  })

  socket.on('request help', function (requestMsg, requestRole, requestTime, requestRoom, requestedId, requestStatus) {
    if (requestRoom === room) {
      requestIsActive = true
      ar_message = requestMsg
      ar_role = requestRole
      ar_time = requestTime
      ar_room = requestRoom
      ar_requestId = requestedId
      ar_status = requestStatus

      if (role === "user") {
        if (requestStatus === "new") {
          $('.message').html("<div class='request s-new-request'><h1>Your request has been sent</h1></div>")
        } else {
          $('.message').html("<div class='request s-old-request'><h1>Help is on the way</h1></div>")
        }
      } else {
        if (requestStatus === "new") {
          $('.message').html(
            "<div class='request b-new-request'><h1>Your Schnuppi needs Help!</h1><p>" + requestMsg + "</p>"
            + requestTime + "</div>")
        } else {
          $('.message').html("<div class='request b-old-request'><h1>You are on your way</h1></div>")
        }
      }

      Notification.requestPermission().then(function (result) {
        if (result === "granted") {
          if (requestStatus === "new") {
            if (role === "supporter") {
              let title = "Your Schnuppi needs help! " + requestMsg
              notification = new Notification(title, {body: "Request created: " + requestTime});
            }
          } else {
            if (role === "user") {
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

function checkIfRequestIsActive() {
  if (requestIsActive) {
    $(".help-button button").removeAttr('disabled');
    $(".message-button button").attr('disabled', 'disabled');
  } else {
    $(".help-button button").attr('disabled', 'disabled');
    $(".message-button button").removeAttr('disabled');
  }

  if (ar_status === "On Se Way") {
    $(".help-button button").attr('disabled', 'disabled');
    $(".message-button button").attr('disabled', 'disabled');

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