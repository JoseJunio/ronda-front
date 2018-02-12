angular.
    module("rondaApp", ['ngMaterial'])
    .service("FuncRondaService", ['$http', function($http){

        var that = this;
        var apiLocais    = "https://ronda-back.herokuapp.com/api/local";
        var apiEmployees = "https://ronda-back.herokuapp.com/api/funcionario";
       
       that.getEmployees = function(){
           return $http.get(apiEmployees);
       }
       
       that.getLocais = function(){
           return $http.get(apiLocais);
       }
       

    }]);