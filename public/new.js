/* Variablen */
let room;
let role;

let requestIsActive = false;

let ar_message;
let ar_role;
let ar_time;
let ar_room;
let ar_requestId;
let ar_status;

let notification;

let nextCounter = 0;

/* Functions */
function next() {
    nextCounter++;
    form = $(".form");

    switch (nextCounter) {
        case 1: $(".notifyer-title").css({
                    "margin-top" : "-200px",
                    "opacity" : "0"
                });
                $(".start-button").css({
                    "opacity" : "0"
                });
                setTimeout(function () {
                    $(".start").hide();
                    $(".collector").addClass("collect");
                    form.fadeIn();
                    form.css("display", "grid");
                }, 500);
                break;
        case 2: setRoom();

    }
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


function checkIfReady() {
    if ($(".role-item").hasClass("active")) {
        if ($(".room-input").hasClass("active")) {
            $(".send-infos button").removeAttr("disabled");
            $(".send-infos button").attr("onclick", "next();");
        } else {
            $(".send-infos button").attr("disabled", "disabled")
        }
    } else {
        $(".send-infos button").attr("disabled", "disabled")
    }

}