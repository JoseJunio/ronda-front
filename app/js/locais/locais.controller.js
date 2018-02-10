angular.
    module("rondaApp")
    .controller("LocalController", ['$scope', 'LocalService', '$mdDialog', '$http', function($scope, LocalService, $mdDialog, $http){
        
        $scope.local        = {};
        $scope.longitude    = 0;
        $scope.latitude     = 0;
        $scope.positions;
        $scope.coordenadas  = [];
        $scope.locations    = [];
        $scope.save         = save;
        $scope.cancel       = cancel;
        $scope.remove       = remove;
        $scope.update       = update;
        $scope.findCoord    = findCoord;
        $scope.initMap      = initMap;
        $scope.findCoordEnd = findCoordEnd;
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        
        findCoord();
        list();
        initMap();
        
        function list(){
            LocalService.getLocais().then(function(response){
                $scope.locais = response.data; 
            });
        }
        
        function save(local){
            //local.latitude = $scope.latitude;
            //local.longitude = $scope.longitude;
            local.rota = JSON.stringify($scope.coordenadas);
            
            //local.rota = "{";
                
            //if($scope.coordenadas.length > 1 && $scope.coordenadas !== null){
                
            //    for(var i=0; i<$scope.coordenadas.length; i++){
            //        local.rota += '{lat: ' + $scope.coordenadas[i].lat + ", lng: " + $scope.coordenadas[i].lng + "}";
            //    }
            //}
            
            //local.rota += "}"
            
            LocalService.save(local).then(list);
            $scope.local = {};
        }
        
        function update(local){
            
            var waypts = [];
            
            $scope.coordenadas = JSON.parse(local.rota);
            
            var size = $scope.coordenadas.length;
            
            if(size > 0 && size !== null){
            
                for(var i=0; i<size; i++){
                    if(i>1 && i<=size-1){
                        waypts.push({
                              location: new google.maps.LatLng({lat: $scope.coordenadas[i].lat, lng: $scope.coordenadas[i].lng}), 
                              stopover: true
                        }); 
                    }
                }   

                request = {
                        origin: new google.maps.LatLng({lat: $scope.coordenadas[0].lat, lng: $scope.coordenadas[0].lng}),
                        destination: new google.maps.LatLng({lat: $scope.coordenadas[size-1].lat, lng: $scope.coordenadas[size-1].lng}),
                        waypoints: waypts,
                        travelMode: google.maps.TravelMode.WALKING
                }

                directionsService.route(request, function(result, status) {
                     if (status == google.maps.DirectionsStatus.OK) {
                             directionsDisplay.setDirections(result);
                             marker.setMap(null);
                     }
                 });
            
            }
            
            $scope.local = angular.copy(local);
        }
        
        function remove(local){
            LocalService.delete(local).then(list);
        }
        
        function cancel(){
            $scope.local = {};
        }
        
        function list(){
            LocalService.getLocais().then(function(response){
                $scope.locais = response.data; 
            });
        }
        
        function findCoord(){
            
            if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {

                   $scope.latitude = position.coords.latitude; 
                   $scope.longitude = position.coords.longitude;

                });
            }
        }   
        
        function findCoordEnd(location){
           
            var url = "https://maps.googleapis.com/maps/api/geocode/json";
            
            var endereco = angular.lowercase(location.nome.replace(/\s/g, "+"));
            
            var cidade = angular.lowercase(location.cidade.replace(/\s/g, "+"));
            
            var estado = angular.lowercase(location.estado.replace(/\s/g, "+"));
            
            var numero = location.numero.replace(/\s/g, "+");
            
            url = url + "?address=" + numero + "+" + endereco + "," + cidade + "," + estado + ",brasil&key=AIzaSyCl3xBSP3WRr--f8oMYDgVHhB-DqDYzWDA";
            
            $http.get(url).then(function mySuccess(response) {
               // Atualiza a Latitude e Longitude
               $scope.latitude = response.data.results[0].geometry.location.lat;
               $scope.longitude = response.data.results[0].geometry.location.lng;
               $scope.positions = {lat: $scope.latitude, lng: $scope.longitude};
               createMap($scope.positions);
            });
        
        }
        
        function initMap(){

            var marker;
            
            var request;
            
            directionsDisplay = new google.maps.DirectionsRenderer();

            var mapDiv = document.getElementById('map');
            var map = new google.maps.Map(mapDiv, {
                center: new google.maps.LatLng(-18.9154466, -48.278443),
                zoom: 18
            });
            
            directionsDisplay.setMap(map);
        
            google.maps.event.addListener(map, 'click', function(args) {  
                
                marker = new google.maps.Marker({
                    position: {lat: args.latLng.lat(), lng: args.latLng.lng()},
                    map: map
                });
                
                $scope.positions = {lat: args.latLng.lat(), lng: args.latLng.lng()};
                
                $scope.coordenadas.push($scope.positions);
                $scope.locations.push(new google.maps.LatLng($scope.positions));
                
                var size = $scope.locations.length;
                
                if($scope.coordenadas.length == 2){
                   request = {
                        origin: $scope.locations[0],//new google.maps.LatLng($scope.coordenadas[0]),
                        destination: $scope.locations[size-1],//new google.maps.LatLng($scope.coordenadas[$scope.coordenadas.length]),
                        travelMode: google.maps.TravelMode.WALKING
                     }
                }else if($scope.coordenadas.length > 2){
                        
                        var waypoints = [];
                        
                        for(var i=0; i<$scope.locations.length; i++){
                            if(i>1 && i<=$scope.locations.length-1){
                                waypoints.push({
                                        location: $scope.locations[i], 
                                        stopover: true
                                });
                            }
                        }
                        
                        request = {
                            origin: $scope.locations[0],
                            destination: $scope.locations[size-1],
                            waypoints: waypoints,
                            travelMode: google.maps.TravelMode.WALKING
                        }
                } 
                    
                if($scope.coordenadas.length >= 2){    
                    directionsService.route(request, function(result, status) {
                         if (status == google.maps.DirectionsStatus.OK) {
                                 directionsDisplay.setDirections(result);
                                 marker.setMap(null);
                         }
                     });
                }
            });
             
            
           // navigator.geolocation.getCurrentPosition(function (position) {

            //    $scope.latitude = position.coords.latitude; 
            //    $scope.longitude = position.coords.longitude; 
                
            //    $scope.positions = {lat: $scope.latitude, lng: $scope.longitude};

            //    createMap($scope.positions);

           // });
        }
        
        function getCoordenadas(positions){
            $scope.coordenadas.push(positions);
            
            var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + positions.lat + "," + positions.lng;
            
            $http.get(url).then(function(response){
                alert("1");
                
            });
        }
        
        function createMap(positions){
            
             var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 19,
                center: positions
             });

             var marker = new google.maps.Marker({
                position: positions,
                map: map
             }); 
        }

}]);