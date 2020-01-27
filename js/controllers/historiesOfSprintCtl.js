angular.module("kanbanApp").controller("historiesOfSprintCtl", function($scope, historiesApiService, filterFilter,$uibModalInstance){    
     
    $scope.histories = [];
    $scope.historiesFilter = [];



    console.log("$scope.sprintSelected: "+ $scope.sprintSelected);

    var loadHistories = function(){

      historiesApiService.getHistoriesToSelect($scope.sprintSelected).then(function(response){

        if(response.data.histories.length == 0){
          $scope.NoHistories = "No Histories to Select!";
        }
        else{

        console.log(response.data);
        $scope.histories = response.data;
        console.log(response.data.histories[0].name);
        console.log(response.data.histories.length);        

         for(i=0;i<response.data.histories.length;i++){
          console.log(response.data.histories[i].id);
          console.log(response.data.histories[i].name);
          console.log(response.data.histories[i].sprint_id);

          if(response.data.histories[i].sprint_id == null){
            console.log("entrou null");
            $scope.historiesFilter.push({id:response.data.histories[i].id,
                                         name: response.data.histories[i].name, 
                                         selected:false});
          }else{
            console.log("entrou not null");
            $scope.historiesFilter.push({id:response.data.histories[i].id,
                                         name: response.data.histories[i].name, 
                                         selected: true});           
           
          }          

         }

        }
         console.log($scope.historiesFilter);


      });

  // Selected Histories
  $scope.selection = [];

  // Helper method to get selected histories
  $scope.selectedHistories = function selectedHistories() {
    return filterFilter($scope.historiesFilter, { selected: true });
  };

  // Watch Histories Changes
  $scope.$watch('historiesFilter|filter:{selected: true}', function (nv) {
    $scope.selection = nv.map(function (history) {
     // $scope.selection.push[{'id':history.id}];
      return {'id':history.id};
    });
  }, true);

  };

    loadHistories();   
    
  $scope.save = function(){
    historiesApiService.putHistoriesSelected($scope.sprintSelected, $scope.selection);    
    $uibModalInstance.close();
  }

  $scope.cancel = function(){
    $uibModalInstance.close();
  }
 
 
 
 
  });

