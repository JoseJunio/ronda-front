angular.
    module("rondaApp")
    .controller("LocalController", ['$scope', 'LocalService', '$mdDialog', '$http', function($scope, LocalService, $mdDialog, $http){
        
        $scope.local        = {};
        $scope.longitude;
        $scope.latitude;
        $scope.positions;
        $scope.save         = save;
        $scope.cancel       = cancel;
        $scope.remove       = remove;
        $scope.update       = update;
        $scope.findCoord    = findCoord;
        $scope.initMap      = initMap;
        $scope.findCoordEnd = findCoordEnd;
        
        list();
        findCoord();
        
        function list(){
            LocalService.getLocais().then(function(response){
                $scope.locais = response.data; 
            });
        }
        
        function save(local){
            local.latitude = $scope.latitude;
            local.longitude = $scope.longitude;
            LocalService.save(local).then(list);
            $scope.local = {};
        }
        
        function update(local){
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
            
            var mysrclat = 0;
            var mysrclong = 0;
            
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
            
            
            
           // https://maps.googleapis.com/maps/api/geocode/json?address=2122+avenida+doutor+laerte+vieira+gon%C3%A7alves,uberlandia,minas+gerais,brasil&key=AIzaSyCl3xBSP3WRr--f8oMYDgVHhB-DqDYzWDA
        }
        
        function initMap(){

            navigator.geolocation.getCurrentPosition(function (position) {

                $scope.latitude = position.coords.latitude; 
                $scope.longitude = position.coords.longitude; 
                
                $scope.positions = {lat: $scope.latitude, lng: $scope.longitude};

                createMap($scope.positions);

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