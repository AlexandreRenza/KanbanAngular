angular.module("kanbanApp").service("historiesApiService", function($http, config){

    this.getHistories = function(){
        
        console.log("api");
        return $http.get( config.baseUrl + "/histories");

    };

    this.postHistories = function(history){
        
        console.log("api");
        return $http.post( config.baseUrl + "/histories", history);

    };

    this.putHistories = function(project_id, history){        
        
        return $http.put( config.baseUrl + "/histories/"+ project_id, history);

    };

    this.delHistories = function(id){        
        
        return $http.delete( config.baseUrl + "/histories/"+ id);

    };



});