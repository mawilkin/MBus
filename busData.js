//Refresh Button Action
$("#refresh").click(function(){
  console.log('refreshing')
  var temp = $('#stop-div').html();
  $('#stop-div').html("")
  $('#stop-div').html(temp)

  /*$('#stop-div').html("");
  getLocation();
  $('#more_btn').show();
  */
});

$('#locate').click(function(){
  $('#stop-div').html("");
  getLocation();
  $('#more_btn').show();
})

//Unhide extra stops
$('#more_btn').click(function(){
   $('stop-card').removeProp('hidden');
    $('#more_btn').hide();
})

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
        var dist = Math.sqrt(Math.pow((obj[i].lat - position.coords.latitude),2) + Math.pow((obj[i].lon - position.coords.longitude),2));
        if(obj[i].active == true){
          stops.push({'name': obj[i].name, 'id': obj[i].id, 'dist': Math.abs(dist)});
        }
      }

      //Sort Stops by Location - nearest to furthest
      stops.sort(function(a, b){
         return a.dist-b.dist;
      })

      //Append Stops
      for(var i=0; i < 10; ++i){
        if(i < 5){
          var temp = '<stop-card id="card'+i+'" stopID="'+stops[i].id + '" name="'+stops[i].name+'"></stop-card>';
          $("#stop-div").append(temp); 
        } else {
          var temp = '<stop-card hidden id="card'+i+'" stopID="'+stops[i].id + '" name="'+stops[i].name+'"></stop-card>';
          $("#stop-div").append(temp); 
        }   
      }

      //Unhide more button
       $('#more_btn').removeProp('hidden');

    });

}

getLocation();
