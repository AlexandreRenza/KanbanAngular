angular.module("kanbanApp").controller("projectCtl", function($scope, projects, projectsApiService){

 
    $scope.message = "Kanban";

    $scope.projects = projects.data;          

    $scope.createProject = function(){

      if ($scope.newProject.id == null) {
        
        var vId = parseInt($scope.projects[$scope.projects.length - 1].id) + 1;            
        $scope.projects.push({id: vId, name: $scope.newProject.name, status: "Ativo"});
        projectsApiService.postProjects({id: vId, name: $scope.newProject.name, status: "Ativo"});

      } else {
   
        $scope.projects[$scope.projects.findIndex( project => project.id === $scope.newProject.id )] = $scope.newProject;
        projectsApiService.postProjects($scope.newProject);
      }        

      delete $scope.project;
      delete $scope.newProject;
      $scope.projectForm.$setPristine();

    };

    $scope.toEdit = function(id){
      var pos = $scope.projects.findIndex( project => project.id === id );  
      $scope.newProject = angular.copy($scope.projects[pos]);
             
    };

    $scope.toDelete = function(id){      
      var pos = $scope.projects.findIndex( project => project.id === id );
      $scope.projects.splice(pos, 1);
      

    };

    $scope.checkInput = function(){
      if (!$scope.newProject) return true;
      return false;
    };   

});