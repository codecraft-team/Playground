function log() {
  document.getElementById("result").innerText = "";

  Array.prototype.forEach.call(arguments, function(msg) {
    if (msg instanceof Error) {
      msg = "Error: " + msg.message;
    } else if (typeof msg !== "string") {
      msg = JSON.stringify(msg, null, 2);
    }
    document.getElementById("result").innerHTML += msg + "\r\n";
  });
}

document.getElementById("login").addEventListener("click", login, false);
document.getElementById("api").addEventListener("click", api, false);
document.getElementById("logout").addEventListener("click", logout, false);

var config = {
  authority: "https://IDENTITY_SERVER_URI",
  client_id: "js",
  redirect_uri: "https://localhost:5001/callback.html",
  response_type: "id_token token",
  scope: "openid profile api1",
  post_logout_redirect_uri: "https://localhost:5001/index.html"
};

var mgr = new Oidc.UserManager(config);

mgr.getUser().then(function(user) {
  if (user) {
    log("User logged in", user.profile);
  } else {
    log("user not logged in");
  }
});

function login() {
  mgr.signinRedirect();
}

function logout() {
  mgr.signoutRedirect();
}

function api() {
  mgr.getUser().then(function(user) {
    var url = "http://";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function() {
      log(xhr.status, JSON.parse(xhr.responseText));
    };
    xhr.setRequestHEader("Authorization", "Bearer" + user.access_token);
    xhr.send();
  });
}
