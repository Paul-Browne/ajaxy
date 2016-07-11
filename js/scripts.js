var arr = [];
function traverse(o) {
    for (i in o) {
        if (!!o[i] && typeof(o[i])=="object") {
              var j = o[i].length;
              while(j--){
                  if(o.name){
                      var k = arr.length;
                      while(k--){
                        if(arr[k][0] == o.name){
                          arr.push([o[i][j].name,o.name ]);
                          arr[arr.length-1] = arr[arr.length-1].concat(arr[k].slice(1));
                        }
                      }
                  }
                  else{
                      arr.push([o[i][j].name]);
                  }
              }
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
    console.log(arr);
    var l = arr.length;
    while(l--){
      if(arr[l][0] == window.location.hash.slice(1) ){
        console.log(window.location.hash.slice(1));
        var m = arr[l].length;
        while(m--){
          console.log(arr[l][m]);
        }
      }
    }
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
