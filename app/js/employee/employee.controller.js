angular.
    module("rondaApp")
    .controller("EmployeesController", ['$scope', 'EmployeesService', '$window', '$location', '$mdDialog', function($scope, EmployeesService, $window, $location, $mdDialog){
        
        $scope.employee = {};
        $scope.save      = save;
        $scope.cancel    = cancel;
        $scope.remove     = remove;
        $scope.update      = update;
        $scope.verifyLogin = verifyLogin;
        
        list();
        
        function list(){
            EmployeesService.getEmployees().then(function(response){
                $scope.employees = response.data; 
            });
        }
        
        function save(employee){
            EmployeesService.save(employee).then(list);
            $scope.employee = {};
        }
        
        function update(employee){
            $scope.employee = angular.copy(employee);
        }
        
        function remove(employee){
            EmployeesService.delete(employee).then(list);
        }
        
        function cancel(){
            $scope.employee = {};
        }
        
        function list(){
            EmployeesService.getEmployees().then(function(response){
                $scope.employees = response.data; 
            });
        }
          
        function verifyLogin(employee){
            
            var userNotFound = false;
            
            list();
            
            for(var emp=0; emp<$scope.employees.length; emp++){
                if($scope.employees[emp].usuario === employee.usuario && $scope.employees[emp].senha === employee.senha){
                    userNotFound = true; 
                    $window.location.href = '/ronda.html';//$window.location.href.replace('/index.html', '/ronda.html');
                    break;
                }
            }
            
            if(!userNotFound){
               alert('Usuário/Senha incorretos. Favor informar corretamente'); 
               $scope.employee = {};
            }
        }   
            
    }]);