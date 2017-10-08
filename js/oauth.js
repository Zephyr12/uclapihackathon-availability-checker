var CLIENT_ID = "4218681856646897.8917625845387480";
var UCLIF_ENDPOINT = "https://uclapi.com/oauth/";
/* COOKIES */


function createCookie(name, value, days){
    var expires = "";

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}


function readCookie(name){
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
}


function eraseCookie(name){
    createCookie(name, "", -1);
}

/* END OF COOKIES */


/* OAUTH */

function randomString(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}


function parameterize(data){
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}


function authorise_url() {
    return (UCLIF_ENDPOINT + "authorise?" + parameterize({client_id: CLIENT_ID, state: randomString(32)}));
}


function parseQuery(qstr) {
    var query = {};
    var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}

function authenticate(){
    document.write(readCookie('oauth_token'));
    if (readCookie('oauth_token') === null){
        var parsed = parseQuery(window.location.search);
        if ("token" in parsed){
          createCookie('oauth_token', parsed.token, 10);
          window.location = "/"
        } else {
          window.location = authorise_url();
        }
    }
}
/* END OF OAUTH */
