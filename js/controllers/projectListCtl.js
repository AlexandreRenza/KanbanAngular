angular.module("kanbanApp").controller("projectListCtl", function($scope, projectsApiService,$timeout, $route){

    $scope.projects = [];

    var loadProjects = function(){

      projectsApiService.getProjects().then(function(response){

        console.log(response.data);
        $scope.projects = response.data;
      });

    };

    $scope.verifyProject = function(page){

      if(!sessionStorage.getItem('project_id')){
          console.log('teste');
          window.location = "#!/alertproject";
      }else{
          console.log('page'+ page);
          window.location = "#!/"+page;
      }

    };

    loadProjects();  
   

    $scope.setPrjChange = function(){

      if ($scope.projectList == undefined){
        console.log('removendo session');
        sessionStorage.removeItem("project_id");
        sessionStorage.removeItem("project_name"); 
        window.location = "#!/alertproject"; 

      }else{
          console.log('gravando project session '+ $scope.projectList.id + '  '+ $scope.projectList.name);
          sessionStorage.setItem("project_id", $scope.projectList.id);
          sessionStorage.setItem("project_name", $scope.projectList.name);  
          window.location = "#!/";    
      }
    };

    $scope.rechargePrj = function(){
      loadProjects();      
    }

    $scope.redirectProject = function(){
      console.log('aqui redirect');
      window.location = "#!/project";
    }

    $scope.checkInput = function(){
      if (!$scope.projectList) return true;
      return false;
    }; 


  


});