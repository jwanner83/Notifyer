let room;
let role;

$(document).ready(function () {
    checkInput(".room-input");
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
}

$('.room-input').on("input", function () {
    checkInput(".room-input");
});

function checkInput(inputclass) {
  if($(inputclass).val()) {
      $(inputclass).addClass("active");
  } else {
      $(inputclass).removeClass("active");
  }
}