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
  ReadSubject();
}

function username_check(username){
    var user_show = document.getElementById('username');
      user_show.innerHTML = username;
}

async function ReadSubject()
{
  let read = await fetch("/ReadSubject");
  let subject = await read.json();
  console.log(subject)
  showCourse(subject);
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
  AddSubject("Easy Arabic Alphabet");
  alert("Apply Successful");
}

function handleApplyJapan()
{
  AddSubject("Easy Japanese Alphabet");
  alert("Apply Successful");
}

function handleApplyEng()
{
  AddSubject("Easy English Alphabet");
  alert("Apply Successful");
}

function showCourse(data){
  console.log("showcoursetest")
  var keys = Object.keys(data);
  console.log(data);
  var wrapper = document.getElementById('wrapper')
  wrapper.className = "all-wrap"
  for (var course_count = 0; course_count<keys.length;course_count++) {
		var temp = document.createElement("div");
		temp.className = "course_layer";
		wrapper.appendChild(temp);
    pic_picker(data,keys,course_count,temp);
		var temp1 = document.createElement("div");
		temp1.className = "text_container";
		temp1.innerHTML = data[keys[course_count]]["Subj_Code"];
		temp.appendChild(temp1);
    var button_wrap = document.createElement("div")
    temp1.appendChild(button_wrap);
    var study_butt = document.createElement("a");
    var quiz_butt = document.createElement("a");
    study_butt.innerText = "TO STUDY HUB"
    quiz_butt.innerText = "QUIZ"
    study_butt.className ="link";
    quiz_butt.className ="link";
    study_butt.onclick = butt_picker(data,keys,course_count,study_butt,quiz_butt);
    quiz_butt.onclick = butt_picker(data,keys,course_count,study_butt,quiz_butt);
    button_wrap.appendChild(study_butt);
    button_wrap.appendChild(quiz_butt);
	}
  

}
function pic_picker(data,keys,course_count,temp){

  if(data[keys[course_count]]["Subj_Code"]=="Easy English Alphabet"){
    var image_contain = document.createElement("img")
    image_contain.src = "../img/eng_rgs.png"
    image_contain.className = "image_inside";
    temp.appendChild(image_contain);
  }
  if(data[keys[course_count]]["Subj_Code"]=="Easy Japanese Alphabet"){
    var image_contain = document.createElement("img")
    image_contain.src = "../img/jpn_rgs.png"
    image_contain.className = "image_inside";
    temp.appendChild(image_contain);
  }
  if(data[keys[course_count]]["Subj_Code"]=="Easy Arabic Alphabet"){
    var image_contain = document.createElement("img")
    image_contain.src = "../img/ara_rgs.png"
    image_contain.className = "image_inside";
    temp.appendChild(image_contain);
  }
 
}
function butt_picker(data,keys,course_count,where_to_go,quiz){
  if(data[keys[course_count]]["Subj_Code"]=="Easy English Alphabet"){
    where_to_go.href = "course_inside.html"
    quiz.href = "./quiz/eng/1Q.html"
  }
  if(data[keys[course_count]]["Subj_Code"]=="Easy Japanese Alphabet"){
    where_to_go.href = "course_inside_Japan.html"
    quiz.href = "./quiz/jpn/1Q.html"
  }
  if(data[keys[course_count]]["Subj_Code"]=="Easy Arabic Alphabet"){
    where_to_go.href = "course_inside_Arabic.html"
    quiz.href = "./quiz/ara/1Q.html"
  }
}



