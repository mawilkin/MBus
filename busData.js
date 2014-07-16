$("#refresh").click(function(){
  console.log('refreshing')
  var temp = $('#stop-div').html();
  $('#stop-div').html("")
  $('#stop-div').html(temp)
});



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude); 
    console.log("Longitude: " + position.coords.longitude); 
}

getLocation();