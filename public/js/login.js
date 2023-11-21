window.onload = pageLoad;

function pageLoad(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if(urlParams.get("error")==1){
    document.getElementById('errordisplay').innerHTML = "Registration Error!"
  }
  if(urlParams.get("error")==2){
    document.getElementById('errordisplay').innerHTML = "Username or password incorrect"
  }
  if(urlParams.get("error")==3){
    document.getElementById('errordisplay').innerHTML = "username not have in database"
  }
}