angular.
    module("rondaApp", ['ngMaterial'])
    .service("EmployeesService", ['$http', function($http){
        
        var that = this;

        var api = "http://localhost:8080/api/webresources/employees";
        
        that.getEmployees = function(){
         return $http.get(api);
        };
        
        that.save = function(employee){
            
            /* Teste */
            /*var employees = that.getEmployees();
            var control   = false;
            
            for(var i=0; i < employees.length; i++){
                if(employees[i].id == employee.id){
                    
                    var confirm = $mdDialog.confirm()
                                    .title('Esse id já existe para um funcionário. Deseja alterá-lo ?')
                                    .ariaLabel('Lucky day')
                                    .targetEvent(ev)
                                    .ok('Sim')
                                    .cancel('Não');
                    
                    $mdDialog.show(confirm).then(function() {
                         return $http.put(api + "/" + employee.id, employee);
                      });
                      control = true;
                      break;
                }
            }
            
            if(!control){
                return $http.post(api, employee);
            }*/
            
            if(employee.id){
               return $http.put(api + "/" + employee.id, employee);
            }else{
               return $http.post(api, employee);
            }
          
        };
        
        that.delete = function(employee){
          return $http.delete(api + "/" + employee.id);
        };
                       
    }]);