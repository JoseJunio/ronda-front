angular.
    module("rondaApp", ['ngMaterial'])
    .service("LocalService", ['$http', function($http){
        
        var that = this;

        var api = "http://localhost:8080/api/webresources/locais";
        
        that.getLocais = function(){
         // return that.employees;
         return $http.get(api);
        };
        
        that.save = function(local){
            
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
            
            if(local.id){
               return $http.put(api + "/" + local.id, local);
            }else{
               return $http.post(api, local);
            }
          
        };
        
        that.delete = function(local){
          return $http.delete(api + "/" + local.id);
        };
                       
    }]);