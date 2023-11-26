
function checkCookie() {
  var username = "";
  if (getCookie("username" == false)) {
    window.location = "/html/login.html";
  }
}
checkCookie();
window.onload = pageLoad;

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
  var username = getCookie('username');
  username_check(username);
}

function username_check(username){
  if(getCookie("username" != false)){
    document.getElementById("register_button").style.display = "none";
    document.getElementById('login_id').innerHTML = username
  }
}