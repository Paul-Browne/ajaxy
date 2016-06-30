// while (i--){
//   if(all[i].getAttribute("ajaxy-content")){
//     all[i].addEventListener('click', function clik(e){
//       var _id = this.getAttribute('ajaxy-target');
//       var _target = document.getElementById(_id);
//       var _content = this.getAttribute('ajaxy-content')
//       httpGet(_content, _target);
//     });
//   }
// }

// run once
function updatePage(){
  var all = document.getElementsByTagName('*');
  var i = all.length;
  var loc = window.location
  if(loc.hash){
    while(i--){
      if(all[i].href == window.location){
        var _id = all[i].getAttribute('ajaxy-target');
        var _target = document.getElementById(_id);
        var _content = all[i].getAttribute('ajaxy-content');
        if(_id.indexOf(',') < 0){
          httpGet(_content, _target);
        }
        else{
          var _id = all[i].getAttribute('ajaxy-target').split(',');
          var _content = all[i].getAttribute('ajaxy-content').split(',');
          var j = _id.length;
          while(j--){
            var taggy = document.getElementById(_id[j].trim());
            var connie = _content[j].trim();
            httpGet(connie, taggy);
          }
        }
      }
    }
  }
}

updatePage();
window.addEventListener('hashchange', function(){
  updatePage();
});


function httpGet(theUrl, target){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange=function()
  {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        target.innerHTML = xmlhttp.responseText;
      }
  }
  xmlhttp.open("GET", theUrl, true);
  xmlhttp.send();
}

// TODO: store old content of changed bits
