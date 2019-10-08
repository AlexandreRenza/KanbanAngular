angular.module("kanbanApp").service("historiesApiService", function($http, config){

    this.getHistories = function(){
        
        console.log("api");
        return $http.get( config.baseUrl + "/histories");

    };

    this.postHistories = function(project){
        
        console.log("api");
        return $http.post( config.baseUrl + "/histories", project);

    };


});