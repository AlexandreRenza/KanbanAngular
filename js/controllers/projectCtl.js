angular.module("kanbanApp").controller("projectCtl", function($scope, projects, projectsApiService, $timeout, $route){

 
    $scope.message = "Kanban";
    $scope.projects = projects.data;          

    $scope.createProject = function(){

      if ($scope.newProject.id == null) {  
        ///var vId = parseInt($scope.projects.projects[$scope.projects.projects.length - 1].id) + 1; 
        ///$scope.projects.projects.push({id: vId, name: $scope.newProject.name, status: $scope.newProject.status});
        console.log('teste');
        projectsApiService.postProjects({ name: $scope.newProject.name, status: $scope.newProject.status});
        
      } else {
   
        ////$scope.projects.projects[$scope.projects.projects.findIndex( project => project.id === $scope.newProject.id )] = $scope.newProject;
        projectsApiService.postProjects($scope.newProject);
      }    

     projectsApiService.getProjects().then(function(response){             
             $scope.projects = response.data;             
     })

      
      $timeout( function(){
          console.log('apply');
          $scope.$apply();
          $route.reload();
      }, 100); 

      delete $scope.project;
      delete $scope.newProject;
      $scope.projectForm.$setPristine();
    };

    $scope.toEdit = function(id){
      //console.log("aqui id: " + id);
      var pos = $scope.projects.projects.findIndex( project => project.id === id );  
      $scope.newProject = angular.copy($scope.projects.projects[pos]);             
    };

    $scope.toDelete = function(id){ 
      projectsApiService.delProjects(id);
      var pos = $scope.projects.projects.findIndex( project => project.id === id );
      $scope.projects.projects.splice(pos, 1);
    };

    $scope.checkInput = function(){
      if (!$scope.newProject) return true;
      return false;
    };   

});