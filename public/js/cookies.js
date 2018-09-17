/* SET COOKIES */
function setCookie(name, value, exdays) {
  var date = new Date();
  date.setTime(date.getTime() + (exdays*24*60*60*1000));
  var expires = "expires ="+ date.toUTCString();
  document.cookie = name + " = " + value + "; " + expires + "; path=/";
}

/* GET COOKIES */
function getCookie(name) {
  var cname = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

/* CHANGE COOKIES */
function changeCookie(name, value, exdays) {
  var cookie = getCookie(name);
  if (cookie !== "") {
    setCookie(name, value, exdays);
  } else {
    cout('error', 'dev', 'Requested Cookie: "' + name + '" was not found');
  }
}

/* DELETE COOKIES */
function deleteCookie(name) {
  setCookie(name, "", -1);
}

/* CHECK COOKIES */
function checkCookie(name, value, exdays) {
  var cookie = getCookie(name);

  if (cookie === "") {
    setCookie(name, value, exdays);
  }
}