angular.
    module("rondaApp", ['ngMaterial'])
    .service("FuncRondaService", ['$http', function($http){

        var that = this;
        var apiLocais    = "http://localhost:8080/api/webresources/locais";
        var apiEmployees = "http://localhost:8080/api/webresources/employees";
       
       that.getEmployees = function(){
           return $http.get(apiEmployees);
       }
       
       that.getLocais = function(){
           return $http.get(apiLocais);
       }
       
       
       

    }]);