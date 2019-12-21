angular.module("kanbanApp").service("sprintsApiService", function($http, config){

    this.getSprints = function(){
        
        console.log("api");
        return $http.get( config.baseUrl + "/sprints");

    };

    this.postSprints = function(sprint){
        
        console.log("api");
        return $http.post( config.baseUrl + "/sprints", sprint);

    };

    this.putSprints = function(project_id, sprint){        
        
        return $http.put( config.baseUrl + "/sprints/"+ project_id, sprint);

    };

    this.delSprints = function(id){        
        
        return $http.delete( config.baseUrl + "/sprints/"+ id);

    };


});