let room;
let role;

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