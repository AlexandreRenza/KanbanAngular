angular.module("kanbanApp").controller("historyCtl", function($scope, histories, historiesApiService, projectsApiService, $timeout, $route){    
    
    $scope.histories = histories.data; 

    $scope.createHistory = function(){

        if ($scope.newHistory.id == null) {
        
            //var vId = parseInt($scope.histories[$scope.histories.length - 1].id) + 1;         
            //$scope.histories.push({id: vId, name: $scope.newHistory.name, description: $scope.newHistory.description, criteria: $scope.newHistory.criteria});
            console.log('teste');
            historiesApiService.postHistories({name: $scope.newHistory.name, 
                description: $scope.newHistory.description, 
                criteria: $scope.newHistory.criteria, 
                status: $scope.newHistory.status, 
                project_id:sessionStorage.getItem('project_id')});
        } else {
            ///$scope.histories[$scope.histories.findIndex( history => history.id === $scope.newHistory.id )] = $scope.newHistory;
            historiesApiService.putHistories($scope.newHistory.id,
                                                {name: $scope.newHistory.name, 
                                                description: $scope.newHistory.description, 
                                                criteria: $scope.newHistory.criteria, 
                                                status: $scope.newHistory.status, 
                                                project_id:sessionStorage.getItem('project_id')});           
        } 
        
        projectsApiService.getProjectsByID(sessionStorage.getItem("project_id")).then(function(response){             
            $scope.histories = response.data;             
        })
     
     $timeout( function(){
         console.log('apply');
         $scope.$apply();
         $route.reload();
     }, 100); 

        delete $scope.history;
        delete $scope.newHistory;
        $scope.historyForm.$setPristine();

    };

    $scope.toEdit = function(id){
        var pos = $scope.histories.histories.findIndex( history => history.id === id );  
        $scope.newHistory = angular.copy($scope.histories.histories[pos]);                
    };

    $scope.toDelete = function(id){
    historiesApiService.delHistories(id);
    var pos = $scope.histories.histories.findIndex( history => history.id === id );
    $scope.histories.histories.splice(pos, 1);
    };

    $scope.checkInput = function(){
    if (!$scope.newHistory) return true;
    return false;
    };    
 });