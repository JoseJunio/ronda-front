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