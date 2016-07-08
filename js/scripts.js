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

var arrr = [];
function traverse(o) {
    for (i in o) {
        if (!!o[i] && typeof(o[i])=="object") {
            //console.log(o[i].length);
            //if(o[i].length){
              var j = o[i].length;
              while(j--){
                  console.log([o[i][j].name, o.name]);
              }
            //}
            //console.log(i);
            //
            //console.log([o.name, i]);
            // if(o[i].name){
            //   console.log(o[i].name);
            //   console.log(Object.keys(o[i]));
            // }
            //console.log(Object.keys(o));
            traverse(o[i]);
        }
    }
}

var json = new XMLHttpRequest();
json.open('GET', '/sitemap.json', true);
json.onreadystatechange = function() {
  if (json.readyState==4 && json.status==200) {


    var obj = JSON.parse(json.responseText);

traverse(obj);

    // var pl = obj.pages;
    // var j = pl.length;
    // while(j--){
    //   var tt = pl[j].name;
    //   console.log(tt);
    // };
    //
    //
    //
    // console.log(obj.pages);



  }
};
json.send(null);



function meat(z) {
  if(z.href == window.location.href){
    var _id = z.getAttribute('ajaxy-target');
    var _target = document.getElementById(_id);
    var _content = z.getAttribute('ajaxy-content');
    if(_id.indexOf(',') < 0){
      httpGet(_content, _target);
    }
    else{
      var _id = z.getAttribute('ajaxy-target').split(',');
      var _content = z.getAttribute('ajaxy-content').split(',');
      var j = _id.length;
      while(j--){
        var taggy = document.getElementById(_id[j].trim());
        var connie = _content[j].trim();
        httpGet(connie, taggy);
      }
    }
  }
}


function updatePage(){
  var all = document.getElementsByTagName('*');
  var i = all.length;
  var loc = window.location
  if(loc.hash){
    while(i--){
      meat(all[i]);
    }
  }
}
// run once
updatePage();

// run when the hash changes
// works for nested hashes
window.addEventListener('hashchange', function(){
  updatePage();
  console.log("hash change detected");
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
