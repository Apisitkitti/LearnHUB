function checkCookie() {
  var username = "";
  if (getCookie("username" == false)) {
    window.location = "/html/login.html";
  }
}
checkCookie();
window.onload = pageLoad

function getCookie(name) {
  var value = "";
  try {
    value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
    return value
  } catch (err) {
    return false;
  }
}

function pageLoad() {
  var username = getCookie("username");
  username_check(username);
}

function username_check(username){
    var user_show = document.getElementById('username');
      user_show.innerHTML = username;
}

async function ReadSubject()
{
  let read = await fetch("/ReadSubject");
  let subject = await read.json;
}

async function AddSubject(subject)
{
  let response = await fetch("/AddSubject",{
    method:"POST",
    headers:{
      'Accept': 'application/json',
     'Content-Type':'application/json'
   },
   body: JSON.stringify({
    username : getCookie("username"),
    subjectcode : subject
   })
  })
}



function handleApplyArabic()
{
  AddSubject("arabic");
  alert("Apply Successful");
}

function handleApplyJapan()
{
  AddSubject("japan");
  alert("Apply Successful");
}

function handleApplyEng()
{
  AddSubject("eng");
  alert("Apply Successful");
}


