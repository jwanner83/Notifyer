/*
var window_focus = false;
var permission;

$(window).focus(function() {
    window_focus = true;
    sendMessage('https://upscore.ch/repo/icon/icon-w.png');
    changeFavicon('https://upscore.ch/repo/icon/icon-w.png');
})
    .blur(function() {
        window_focus = false;
    });

function actualMessage(text) {
    var options = {
        body: text,
        icon: "https://upscore.ch/repo/icon/icon-w.png",
        dir : "ltr",
        tag: "soManyNotification"
    };
    new Notification("upscore.ch",options);
}

function checkPermission() {
    if (!("Notification" in window)) {
        cout('info', '', 'Dieser Browser unterstützt Benachrichtigungen nicht');
    } else {
        Notification.requestPermission(function (permission) {
            if (permission === "granted"){
                permission = "granted";
            }
        })
    }
}

function browserMessage(text) {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        actualMessage(text);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        checkPermission();

        if (permission === "granted") {
            actualMessage(text);
        }
    }
}

// send message to parent browser for icon change
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}

function sendMessage(src) {
    window.parent.postMessage(src, '*');
}

document.head = document.head || document.getElementsByTagName('head')[0];

function changeFavicon(src) {
    var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (oldLink) {
        document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
} */