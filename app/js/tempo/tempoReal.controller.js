angular.
module("rondaApp")
.controller("TempoRealController", ['$scope', 'EmployeesService', '$window', '$location', '$mdDialog', function($scope, EmployeesService, $window, $location, $mdDialog){

    $scope.initMap = initMap;
    $scope.latitude = 0;
    $scope.longitude = 0;
    var labels = [];
    var titles = [];
    $scope.locations2 = [];
    var locations = [];
    
    initMap();

    function initMap(){

        EmployeesService.getEmployees().then(function(response){
            
            $scope.employees = response.data; 

            $scope.latitude = parseFloat($scope.employees[0].latitude);
            $scope.longitude = parseFloat($scope.employees[0].longitude);

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: {lat: $scope.latitude, lng: $scope.longitude}
            });
        
            for(var i=0; i<$scope.employees.length; i++){

                if($scope.employees[i].latitude != null && $scope.employees[i].longitude != null){

                    locations.push({lat: parseFloat($scope.employees[i].latitude), lng: parseFloat($scope.employees[i].longitude)});

                    if($scope.employees[i].name.indexOf(" ") > -1){
                      labels.push(angular.uppercase($scope.employees[i].name.charAt(0) + $scope.employees[i].name.charAt($scope.employees[i].name.indexOf(" ") + 1)));  
                    }else{
                      labels.push(angular.uppercase($scope.employees[i].name.charAt(0) + $scope.employees[i].name.charAt(1)));  
                    }


                    titles.push($scope.employees[i].name)
                   // titles[i] = $scope.employees[i].name;
                }
            }

            var markers = locations.map(function(location, i) {
              return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length],
                title: 'Funcionário: ' + titles[i % titles.length]
              });
            });

            var markerCluster = new MarkerClusterer(map, markers,{
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
             });

        });
    
    }

}]);