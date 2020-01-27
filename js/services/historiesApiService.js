angular.module("kanbanApp").service("historiesApiService", function($http, config){

    this.getHistories = function(){
        
        console.log("api");
        return $http.get( config.baseUrl + "/histories");

    };

    this.getHistoriesToSelect = function(sprint_id){
        
        console.log("api");
        return $http.get( config.baseUrl + "/histories/sprint/" + sprint_id);

    };

    this.getHistoriesOnBoard = function(sprint_id){
        
        console.log("api");
        return $http.get( config.baseUrl + "/histories/board/" + sprint_id);

    };

    this.postHistories = function(history){
        
        console.log("api");
        return $http.post( config.baseUrl + "/histories", history);

    };

    this.putHistories = function(project_id, history){        
        
        return $http.put( config.baseUrl + "/histories/"+ project_id, history);

    };

    this.putHistoriesSelected = function(sprint_id, histories){        
        
        return $http.put( config.baseUrl + "/histories/sprint/"+ sprint_id, histories);

    };

    this.putHistoriesImpl = function(implStatus, historyId){        
        
        return $http.put( config.baseUrl + "/histories/boardchange/"+ implStatus+"/"+historyId);

    };

    this.delHistories = function(id){        
        
        return $http.delete( config.baseUrl + "/histories/"+ id);

    };



});