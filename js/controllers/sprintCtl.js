angular.module("kanbanApp").controller("sprintCtl", function($scope, sprints, sprintsApiService,  projectsApiService, $timeout, $route, $http, $interval, $uibModal){

 
    $scope.message = "Kanban";

    $scope.sprints = sprints.data;          

    $scope.createSprint = function(){

      if ($scope.newSprint.id == null) {
        
        //var vId = parseInt($scope.sprints[$scope.sprints.length - 1].id) + 1;            
        // $scope.sprints.push({id: vId, name: $scope.newSprint.name, goal: $scope.newSprint.goal, stdate: $scope.newSprint.stdate, enddate: $scope.newSprint.enddate });
        sprintsApiService.postSprints({name: $scope.newSprint.name,
                          goal: $scope.newSprint.goal, 
                          startDate: $scope.newSprint.startDate, 
                          endDate: $scope.newSprint.endDate, 
                          status: $scope.newSprint.status, 
                          project_id:sessionStorage.getItem('project_id')});

      } else {
   
        ///$scope.sprints[$scope.sprints.findIndex( sprint => sprint.id === $scope.newSprint.id )] = $scope.newSprint;
        sprintsApiService.putSprints($scope.newSprint.id, {
                                        name: $scope.newSprint.name,
                                        goal: $scope.newSprint.goal, 
                                        startDate: $scope.newSprint.startDate, 
                                        endDate: $scope.newSprint.endDate, 
                                        status: $scope.newSprint.status, 
                                        project_id:sessionStorage.getItem('project_id')});
      } 
      
      projectsApiService.getProjectsByID(sessionStorage.getItem("project_id")).then(function(response){             
        $scope.sprints = response.data;             
      })
 
      $timeout( function(){
          console.log('apply');
          $scope.$apply();
          $route.reload();
      }, 100); 


      delete $scope.sprint;
      delete $scope.newSprint;
      $scope.sprintForm.$setPristine();

    };

    $scope.toEdit = function(id){
      
      var pos = $scope.sprints.sprints.findIndex( sprint => sprint.id === id );  
      $scope.newSprint = angular.copy($scope.sprints.sprints[pos]);
             
    };

    $scope.toDelete = function(id){   
      sprintsApiService.delSprints(id);   
      var pos = $scope.sprints.sprints.findIndex( sprint => sprint.id === id );
      $scope.sprints.sprints.splice(pos, 1);
    };

    $scope.checkInput = function(){
      if (!$scope.newSprint) return true;
      return false;
    };  
    
    $scope.open = function(id) {

      $scope.sprintSelected = id;
      ///console.log("aqui");
      var modalInstance =  $uibModal.open({        
        templateUrl: "./view/template/modalSelectHistories.html",
        controller: "historiesOfSprintCtl",
        'modal-in-class': 'show',
        size: 'lg',
        scope: $scope,
        
      });
      

      
    };




    



    
    






});