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
    // run once when json is ready
    localStorage.setItem("previousPage", "null");
    something();
  }
};
json.send(null);


// function something(){
//     var l = arr.length;
//     while(l--){
//
//         // if hash is in sitemap.json
//
//         if(arr[l][0] == window.location.hash.slice(1) ){
//             var all = document.getElementsByTagName('*');
//             var i = all.length;
//             while(i--){
//                 meat(all[i]);
//             }
//         }
//     }
// }



// function something(){
//     var l = arr.length;
//     while(l--){
//         // if hash is in site map
//         if(arr[l][0] == window.location.hash.slice(1) ){
//             var m = arr[l].length;
//             var old = localStorage.getItem("previousPage");
//             var all = document.getElementsByTagName('*');
//             var i = all.length;
//             //console.log([arr[l],arr[l][1],old]);
//
//             // scenario: clicks on a page with no parents
//
//             if(m == 1){
//                 //console.log("hi there");
//                 while(i--){
//                     meat(all[i]);
//                 }
//             }
//
//             // scenario: clicks on #map, when on #map's parent page
//
//             if(old == arr[l][1]){
//                 //console.log("booooooom");
//                 while(i--){
//                     meat(all[i]);
//                 }
//             }
//
//             // scenario: clicks on #map when NOT on #map's parent page
//             //old = undefined, arr[l][1] = undefined
//             if(m > 1 && old != arr[l][1]){
//                 while(m--){
//                     console.log(arr[l][m]);
//
//                 }
//             }
//
//
//             /*
//             while(m--){
//                 console.log(arr[l][m]);
//             }
//             */
//         }
//     }
//     localStorage.setItem("previousPage", window.location.hash.slice(1));
// }

function something(){
    var l = arr.length;
    while(l--){
        // if hash is in site map
        if(arr[l][0] == window.location.hash.slice(1) ){
            var m = arr[l].length;
            var old = localStorage.getItem("previousPage");
            var all = document.getElementsByTagName('*');
            var i = all.length;


                //console.log([arr[l],arr[l][1],old]);
                // scenario: clicks on a page with no parents

            if(m == 1){
                while(i--){

                //console.log("hi there");
                    if(all[i].href == window.location.href){
                        meat(all[i]);
                    }
                }
            }

            // scenario: clicks on #map, when on #map's parent page
            if(old == arr[l][1]){
                while(i--){
                    if(all[i].href == window.location.href){
                        meat(all[i]);
                    }
                }
            }

            /* =================== */
            /* HERE IS THE PROBLEM */
            /* =================== */

            // scenario: clicks on #map when NOT on #map's parent page
            //old = undefined, arr[l][1] = undefined
            // if(m > 1 && old != arr[l][1]){
            //     while(m--){
            //         console.log(arr[l][m]);
            //         var every = document.getElementsByTagName("*");
            //         var k = every.length;
            //         while(k--){
            //             if(every[k].href){
            //                 if( (every[k].href.slice(every[k].href.indexOf("#")+1)) == arr[l][m] ){
            //                     console.log(every[k]);
            //                     multiPartUpdate(every[k], arr[l][m]);
            //                 }
            //             }
            //         }
            //     }
            // }

            if(m > 1 && old != arr[l][1]){
                while(m--){
                    console.log(arr[l][m]);
                    var every = document.getElementsByTagName("*");
                    var k = every.length;
                    while(k--) {
                        if(every[k].href){
                            if( (every[k].href.slice(every[k].href.indexOf("#")+1)) == arr[l][m] ){
                                console.log(every[k]);
                                multiPartUpdate(every[k], arr[l][m]);
                            }
                        }
                    }
                }
            }



        }
    }
    localStorage.setItem("previousPage", window.location.hash.slice(1));
}


function multiPartUpdate(z, qq){
    var _content = z.getAttribute('ajaxy-content');
    if(_content.indexOf(',') < 0){
      httpGet2(_content, qq, true);
    }
    else{
      var _content = z.getAttribute('ajaxy-content').split(',');
      var j = _content.length;
      while(j--){
        var connie = _content[j].trim();
        if(j<1){
            httpGet2(connie, qq, true);
        }else
        {
            httpGet2(connie, qq, false);
        }
      }
    }
}
var store = [];
function httpGet2(theUrl, qq, bool){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        //target.innerHTML = xmlhttp.responseText;
        slowDown(xmlhttp.responseText, qq, bool);
    }
  }
  xmlhttp.open("GET", theUrl, true);
  xmlhttp.send();
}
function slowDown(b, qq, bool){
    store.push({b, qq, bool});
    console.log(store);
    if(bool && qq == window.location.hash.slice(1)){
        console.log("hello");

        var x = 0;
        var xx = store.length;
        while(x < xx) {

            console.log(store[x].b);

            var attack = document.getElementById("");
            atack.innerHTML = store[x].b

            //document.getElementById();

            x++;
        }

        store = [];
    }
}



function meat(z) {
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


window.addEventListener('hashchange', function(){
    something();
});

// decouple getiing the data, and inserting it into the dom
// then add a callback after DOM insertion


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






/*
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
*/
