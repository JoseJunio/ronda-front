angular.
    module("rondaApp", ['ngMaterial'])
    .service("LocalService", ['$http', function($http){
        
        var that = this;
		var teste = [];
		
        var api = "http://localhost:8080/api/webresources/locais";
        
        that.getLocais = function(){
         return teste;//$http.get(api);
        };
        
        that.save = function(local){
            if(local.id){
               return teste;//$http.put(api + "/" + local.id, local);
            }else{
               return teste;//$http.post(api, local);
            }
          
        };
        
        that.delete = function(local){
          return teste;//$http.delete(api + "/" + local.id);
        };
                       
    }]);