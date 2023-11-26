
checkCookie();
window.onload = pageLoad
function checkCookie() {
  var username = "";
  if (getCookie("username" == false)) {
    window.location = "/html/index.html";
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
  var username = getCookie("username");
  var password = getCookie("password")
  document.getElementById("register_button").innerHTML = username;
}
// function username_check(username){
//     document.getElementById("register_button").style.display = "none";
//     document.getElementById("login_id").style.display = "none";
//     var user_show = document.getElementById('username');
//     user_show.innerHTML =  username  
// }