angular.module("kanbanApp").service("projectsApiService", function($http, config){

    this.getProjects = function(){        
        
        return $http.get( config.baseUrl + "/projects");

    };

    this.getProjectsByID = function(id){        
        
        return $http.get( config.baseUrl + "/projects/"+ id);

    };

    this.postProjects = function(project){        
        
        return $http.post( config.baseUrl + "/projects", project);

    };


    this.delProjects = function(id){        
        
        return $http.delete( config.baseUrl + "/projects/"+ id);

    };

});