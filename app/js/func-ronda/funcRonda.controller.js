angular.
module("rondaApp")
.controller("FuncRondaController", ['$scope', '$filter', 'FuncRondaService', '$window', '$location', '$mdDialog', function($scope, FuncRondaService, $window, $filter, $location, $mdDialog){
       
    $scope.listEmployees        = [];   
    $scope.listLocais           = [];
    


    $scope.horarioFim           = [];
    $scope.week                 = [{dia: 'Segunda'}, {dia: 'Terça'}, {dia:'Quarta'}, {dia: 'Quinta'}, {dia: 'Sexta'}, {dia: 'Sábado'}, {dia:'Domingo'}];
    $scope.selectedDays         = [];
    
    $scope.save          = save;  
    $scope.hourMonday = {hourin: new Date(), hourout: new Date()};

        
    list();    
        
    function list(){
        FuncRondaService.getLocais().then(function(response){
            $scope.listLocais = response.data;
            
            FuncRondaService.getEmployees().then(function(response){
                $scope.listEmployees = response.data;
                
                // retirar valores null
                var temp = [];
                var i;

                for(i=0; i<$scope.listEmployees.length; i++){
                    if($scope.listEmployees[i].codigo !== null){
                        temp.push($scope.listEmployees[i]);
                    }
                }
                $scope.listEmployees = temp;

                temp = [];

                for(i=0; i<$scope.listLocais.length; i++){
                    if($scope.listLocais[i].codigo !== null){
                        temp.push($scope.listLocais[i]);
                    }
                }
                $scope.listLocais = temp;
                temp = [];
            
            });
        });
       
    }
       
    function save(){

        angular.forEach($scope.week, function(day){
          if (day.selected){
            console.log(hourMonday.hourin);
            console.log(hourMonday.hourout);
          } 
        });



    }   
       
}]);