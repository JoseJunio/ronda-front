angular.
module("rondaApp")
.controller("FuncRondaController", ['$scope', 'FuncRondaService', '$window', '$location', '$mdDialog', function($scope, FuncRondaService, $window, $location, $mdDialog){
       
    $scope.ronda                = {};
    $scope.listEmployees        = [];   
    $scope.listLocais           = [];
    $scope.codfunc;
    $scope.codlocal;

    $scope.week                 = [{dia: 'Segunda'}, {dia: 'Terça'}, {dia:'Quarta'}, {dia: 'Quinta'}, {dia: 'Sexta'}, {dia: 'Sábado'}, {dia:'Domingo'}];
    $scope.save          = save;  
    $scope.update        = update;
    $scope.remove        = remove;
    $scope.cancel        = cancel;

    

    $scope.hourMondayIn;  
    $scope.hourMondayOut;  
    $scope.hourTuesdayIn;
    $scope.hourTuesdayOut;
    $scope.hourWednesdayIn;
    $scope.hourWednesdayOut;
    $scope.hourThursdayIn;
    $scope.hourThursdayOut;
    $scope.hourFridayIn;
    $scope.hourFridayOut;
    $scope.hourSaturdayIn;
    $scope.hourSaturdayOut;
    $scope.hourSundayIn;
    $scope.hourSundayOut;    

    list();    
        
    function list(){

        FuncRondaService.getRondas().then(function(response){
             $scope.rondas = response.data;
        });


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

        var rota;

        rota.codfunc            = $scope.codfunc.id;
        rota.codlocal           = $scope.codlocal.id;
        rota.dias_trabalho      = '[';

        angular.forEach($scope.week, function(day){
          if (day.selected){
            
            switch(day.dia){
                    case 'Segunda':
                        rota.dias_trabalho += "{'Dia': 'Segunda', 'horaInicio': '" + $scope.hourMondayIn + "', 'horaFim': '" + $scope.hourMondayOut "' }"   
                        break;
                    case 'Terça':
                        rota.dias_trabalho += "{'Dia': 'Terça', 'horaInicio': '" + $scope.hourTuesdayIn + "', 'horaFim': '" + $scope.hourTuesdayOut "' }"  
                        break;
                    case 'Quarta':
                        rota.dias_trabalho += "{'Dia': 'Quarta', 'horaInicio': '" + $scope.hourWednesdayIn + "', 'horaFim': '" + $scope.hourWednesdayOut "' }"  
                        break;
                    case 'Quinta':
                        rota.dias_trabalho += "{'Dia': 'Quinta', 'horaInicio': '" + $scope.hourThursdayIn + "', 'horaFim': '" + $scope.hourThursdayOut "' }"  
                        break;
                    case 'Sexta':
                        rota.dias_trabalho += "{'Dia': 'Sexta', 'horaInicio': '" + $scope.hourFridayIn + "', 'horaFim': '" + $scope.hourFridayOut "' }"  
                        break;
                    case 'Sábado':
                        rota.dias_trabalho += "{'Dia': 'Sábado', 'horaInicio': '" + $scope.hourSaturdayIn + "', 'horaFim': '" + $scope.hourSaturdayOut "' }"  
                        break;
                    case 'Domingo':
                        rota.dias_trabalho += "{'Dia': 'Domingo', 'horaInicio': '" + $scope.hourSundayIn + "', 'horaFim': '" + $scope.hourSundayOut "' }"  
                        break;
                    default:
                        break;

            }  

            rota.dias_trabalho += ']'; 

            
          } 
        });

       //FuncRondaService.save().then(list);
    }

    function update(ronda){
        $scope.ronda = angular.copy(ronda);
    }
    
    function remove(ronda){
        FuncRondaService.delete(ronda).then(list);
    }
    
    function cancel(){
        $scope.ronda = {};
    }   
       
}]);