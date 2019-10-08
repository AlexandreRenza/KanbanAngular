angular.module("kanbanApp").controller("projectListCtl", function($scope, projectsApiService){

    $scope.listProjects = [];

    var loadProjects = function(){

      projectsApiService.getProjects().then(function(response){

       /// console.log(response.data);
        $scope.listProjects = response.data;
      });

    };

    loadProjects();

});