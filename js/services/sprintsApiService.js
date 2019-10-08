angular.module("kanbanApp").service("sprintsApiService", function($http, config){

    this.getSprints = function(){        
        
        return $http.get( config.baseUrl + "/sprints");

    };

    this.postSprints = function(sprint){        
        
        return $http.post( config.baseUrl + "/sprints", sprint);

    };


});