angular.
    module("rondaApp", ['ngMaterial'])
    .service("FuncRondaService", ['$http', function($http){

        var that = this;
        var apiLocais    = "https://ronda-back.herokuapp.com/api/local";
        var apiEmployees = "https://ronda-back.herokuapp.com/api/funcionario";

        var apiRonda = "https://ronda-back.herokuapp.com/api/ronda";
       
       that.getEmployees = function(){
           return $http.get(apiEmployees);
       }
       
       that.getLocais = function(){
           return $http.get(apiLocais);
       }
       
       that.getRondas = function(){
         return $http.get(apiRonda);
       };

       that.save = function(ronda){
            
         if(ronda.id){
              return $http.put(apiRonda, ronda);
          }else{
              return $http.post(apiRonda, ronda);
          }
          
      };
        
      that.delete = function(ronda){
        return $http.delete(apiRonda, ronda);
      };

    }]);