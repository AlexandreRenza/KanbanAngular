angular.module("kanbanApp").controller("sprintCtl", function($scope, sprints, sprintsApiService,  projectsApiService, $timeout, $route, $http, $interval){

 
    $scope.message = "Kanban";

    $scope.sprints = sprints.data;          

    $scope.createSprint = function(){

      if ($scope.newSprint.id == null) {
        
        //var vId = parseInt($scope.sprints[$scope.sprints.length - 1].id) + 1;            
        // $scope.sprints.push({id: vId, name: $scope.newSprint.name, goal: $scope.newSprint.goal, stdate: $scope.newSprint.stdate, enddate: $scope.newSprint.enddate });
        sprintsApiService.postSprints({name: $scope.newSprint.name,
                          goal: $scope.newSprint.goal, 
                          stdate: $scope.newSprint.startDate, 
                          enddate: $scope.newSprint.endDate, 
                          status: $scope.newSprint.status, 
                          project_id:sessionStorage.getItem('project_id')});

      } else {
   
        ///$scope.sprints[$scope.sprints.findIndex( sprint => sprint.id === $scope.newSprint.id )] = $scope.newSprint;
        sprintsApiService.putSprints($scope.newSprint.id, {
                                        name: $scope.newSprint.name,
                                        goal: $scope.newSprint.goal, 
                                        stdate: $scope.newSprint.startDate, 
                                        enddate: $scope.newSprint.endDate, 
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
      historiesApiService.delSprints(id);   
      var pos = $scope.sprints.sprints.findIndex( sprint => sprint.id === id );
      $scope.sprints.sprints.splice(pos, 1);
      

    };

    $scope.checkInput = function(){
      if (!$scope.newSprint) return true;
      return false;
    };  
    



 
    $scope.myDropdownOptions = [ ];

  //  $scope.myDropdownOptions = [{
   //   id: $scope.sprints.sprints[0].id,
   //   label: $scope.sprints.sprints[0].name
  //  }];

    console.log('tamanho: '+ $scope.sprints.sprints.length );
    
    for (i=0; i<$scope.sprints.sprints.length;i++){

      console.log('loop: '+ $scope.sprints.sprints[i].name );
      label = $scope.sprints.sprints[i].name;
      id = $scope.sprints.sprints[i].id;

      $scope.myDropdownOptions.push({id:id, label:label});

    }

    $scope.myDropdownModel = [];


  
    $scope.myDropdownSettings = {
      styleActive: true,
      checkBoxes: true,
      enableSearch: true,
      selectedToTop: true,
      scrollable: true,      
      buttonClasses: 'btn btn-primary dropdown-toggle',
      smartButtonTextProvider(selectionArray) {
        
        if (selectionArray.length === 1) {
          return selectionArray[0].label;
        } else {
          return selectionArray.length + ' Selected';
        }
      }
 
    };

  
    $scope.cars = [{id:1, name: 'Audi'}, {id:2, name: 'BMW'}, {id:1, name: 'Honda'}];
    $scope.selectedCar = [];




    



    
    






});