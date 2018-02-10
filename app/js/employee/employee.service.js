angular.
    module("rondaApp", ['ngMaterial'])
    .service("EmployeesService", ['$http', function($http){
        
        var that = this;
		var teste = [];

        var api = "http://localhost:8080/api/webresources/employees";
        
        that.getEmployees = function(){
         // return that.employees;
         return teste;
        };
        
        that.save = function(employee){
            
            if(employee.id){
               return teste;//$http.put(api + "/" + employee.id, employee);
            }else{
               return teste; //$http.post(api, employee);
            }
          
        };
        
        that.delete = function(employee){
          return teste;//$http.delete(api + "/" + employee.id);
        };
                       
    }]);