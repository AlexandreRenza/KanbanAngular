angular.module("kanbanApp").service("projectsApiService", function($http, config){

    this.getProjects = function(){        
        
        return $http.get( config.baseUrl + "/projects");

    };

    this.postProjects = function(project){        
        
        return $http.post( config.baseUrl + "/projects", project);

    };


    this.delProjects = function(project){        
        
        return $http.post( config.baseUrl + "/delprojects", project);

    };

});