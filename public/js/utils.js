//console function
function cout(type, reason, message) {
    if (reason === 'dev') {
        reason = 'Developer Nachricht: ';
    } else if (reason === 'fail') {
        reason = 'Nachricht wurde nicht gesendet: ';
    } else {
        reason = '';
    }

    if (type === 'error') {
        console.error(reason + message)
    } else if (type === 'warn') {
        console.warn(reason + message)
    } else if (type === 'info') {
        console.info(reason + message)
    } else if (type === 'log') {
        console.log(reason + message)
    } else {
        console.log(reason + message)
    }
}

//user id
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//color id
Colors = {};
Colors.names = {
    aqua: "#003545",
    azure: "#00454a",
    beige: "#3c6562",
    black: "#ed6363",
    blue: "#374955",
    brown: "#f62a66",
    cyan: "#f4f9f4",
    darkblue: "#c4e3cb",
    darkcyan: "#8aae92",
    darkgrey: "#616161",
    darkgreen: "#333366",
    darkkhaki: "#74dac6",
    darkmagenta: "#20c1bd",
    darkolivegreen: "#33354a",
    darkorange: "#092a35",
    darkorchid: "#658525",
    darkred: "#cfee91",
    darksalmon: "#92e6e6",
    darkviolet: "#d65d7a",
    fuchsia: "#bad7df",
    gold: "#ffe2e2",
    green: "#99ddcc",
    indigo: "#283149",
    khaki: "#404b69",
    lightblue: "#00818a",
    lightcyan: "#dbedf3",
    lightgreen: "#323643",
    lightgrey: "#606470",
    lightpink: "#93deff",
    lightyellow: "#5ba19b",
    lime: "#404b69",
    magenta: "#283149",
    maroon: "#ff7100",
    navy: "#be3030",
    olive: "#222222",
    orange: "#427996",
    pink: "#e9fadd",
    purple: "#b8e4c9",
    violet: "#3f5468",
    red: "#3f5468",
    silver: "#113a5d",
    white: "#062743",
    yellow: "#c4ffdd"
};

Colors.random = function() {
    var result;
    var count = 0;
    for (var prop in this.names)
        if (Math.random() < 1/++count)
            result = prop;
    return result;
};


// link detection
function urlify(text) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return text.replace(urlRegex, function(url,b,c) {
        var url2 = (c === 'www.') ?  'http://' +url : url;
        return '<a href="' + url2 + '" target="_blank">' + url + '</a>';
    })
}