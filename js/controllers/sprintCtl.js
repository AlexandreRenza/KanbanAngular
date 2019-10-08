angular.module("kanbanApp").controller("sprintCtl", function($scope, sprints, sprintsApiService){

 
    $scope.message = "Kanban";

    $scope.sprints = sprints.data;          

    $scope.createSprint = function(){

      if ($scope.newSprint.id == null) {
        
        var vId = parseInt($scope.sprints[$scope.sprints.length - 1].id) + 1;            
        $scope.sprints.push({id: vId, name: $scope.newSprint.name, goal: $scope.newSprint.goal, stdate: $scope.newSprint.stdate, enddate: $scope.newSprint.enddate });
        sprintsApiService.postSprints({id: vId, name: $scope.newSprint.name, goal: $scope.newSprint.goal, stdate: $scope.newSprint.stdate, enddate: $scope.newSprint.enddate });

      } else {
   
        $scope.sprints[$scope.sprints.findIndex( sprint => sprint.id === $scope.newSprint.id )] = $scope.newSprint;
        sprintsApiService.postSprints($scope.newSprint);
      }        

      delete $scope.sprint;
      delete $scope.newSprint;
      $scope.sprintForm.$setPristine();

    };

    $scope.toEdit = function(id){
      var pos = $scope.sprints.findIndex( sprint => sprint.id === id );  
      $scope.newSprint = angular.copy($scope.sprints[pos]);
             
    };

    $scope.toDelete = function(id){      
      var pos = $scope.sprints.findIndex( sprint => sprint.id === id );
      $scope.sprints.splice(pos, 1);
      

    };

    $scope.checkInput = function(){
      if (!$scope.newSprint) return true;
      return false;
    };   

});