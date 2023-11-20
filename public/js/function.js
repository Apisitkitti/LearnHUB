var hit_check = 0;
var reset_hit = 0;
function openNav()
{
  if(hit_check === 0){
    document.getElementById("sidebar").style.width = "280px";
    hit_check = 1;
  }
  else
  {
    document.getElementById("sidebar").style.width = "0";
    hit_check = reset_hit;
  }

}
function closeSidebar(){
  document.getElementById("sidebar").style.width = "0";
}