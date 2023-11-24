
function checkCookie() {
  var username = "";
  if (getCookie("username" == false)) {
    window.location = "/html/login.html";
  }
  if(getCookie("username" == true)){
    document.getElementById("register_button").style.display = "none";
    document.getElementById("login_id").innerHTML = getCookie("username");
    window.location = "/html/index.html"
  }
}

function getCookie(name) {
  var value = "";
  try {
    value - document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
    return value
  } catch (err) {
    return false;
  }
}

function pageLoad() {
  var username = getCookie('username')
  document.getElementById('login_id').innerHTML = username
}