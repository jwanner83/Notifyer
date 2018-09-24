let room;
let role;

function start() {
  $(".notifyer-title").css({
    "margin-top" : "-100px",
    "opacity" : "0"
  });

  $(".start-button").css({
    "opacity" : "0"
  });

  setTimeout(function () {
    $(".collector").addClass("collect");

    $(".notifyer-title-small").css({
      "margin-bottom" : "0",
    });
  }, 500)
}