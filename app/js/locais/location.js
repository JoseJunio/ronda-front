function initMap(){
    var uluru = {lat: -18.926, lng: -48.234};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 19,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });

}