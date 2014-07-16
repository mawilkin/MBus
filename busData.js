//Refresh Button Action
$("#refresh").click(function(){
  console.log('refreshing')
  var temp = $('#stop-div').html();
  $('#stop-div').html("")
  $('#stop-div').html(temp)
});


//GeoLocation Functions
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(findClosest);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function findClosest(position) {
    console.log("Latitude: " + position.coords.latitude); 
    console.log("Longitude: " + position.coords.longitude); 

    //Stores name, id, and distance from user
    var stops = [];


    //Get list of stops with names, id
    //var url = 'http://www.corsproxy.com/mbus.doublemap.com/map/v2/stops';
    var url = 'http://141.213.90.22:8001/stops'
    $.get(url, function(data){

      var obj = data;
      for(i in obj){
        var dist = (obj[i].lat - position.coords.latitude) + (obj[i].lon - position.coords.longitude);
        if(obj[i].active == true){
          stops.push({'name': obj[i].name, 'id': obj[i].id, 'dist': Math.abs(dist)});
        }
      }

      //Sort Stops by Location - nearest to furthest
      stops.sort(function(a, b){
         return a.dist-b.dist;
      })

      //Append Stops
      for(var i=0; i < 5; ++i){
        var temp = '<stop-card id="card'+i+'" stopID="'+stops[i].id + '" name="'+stops[i].name+'"></stop-card>';
        $("#stop-div").append(temp);    
      }

    });

}

getLocation();