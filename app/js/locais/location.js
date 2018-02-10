function initMap(){
    var uluru = {lat: -18.9154466, lng: -48.278443};
 
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: uluru
    });
    
}