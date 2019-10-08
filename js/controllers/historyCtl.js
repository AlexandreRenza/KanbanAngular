angular.module("kanbanApp").controller("historyCtl", function($scope, histories, historiesApiService){    
    

    $scope.histories = histories.data; 

    $scope.createHistory = function(){

        if ($scope.newHistory.id == null) {
        
            var vId = parseInt($scope.histories[$scope.histories.length - 1].id) + 1;         
            $scope.histories.push({id: vId, name: $scope.newHistory.name, description: $scope.newHistory.description, criteria: $scope.newHistory.criteria});
            historiesApiService.postHistories({id: vId, name: $scope.newHistory.name, description: $scope.newHistory.description, criteria: $scope.newHistory.criteria});

        } else {
            $scope.histories[$scope.histories.findIndex( history => history.id === $scope.newHistory.id )] = $scope.newHistory;
            historiesApiService.postHistories($scope.newHistory);
        }        

        delete $scope.history;
        delete $scope.newHistory;
        $scope.historyForm.$setPristine();

    };

    $scope.toEdit = function(id){
        var pos = $scope.histories.findIndex( history => history.id === id );  
        $scope.newHistory = angular.copy($scope.histories[pos]);                
    };

    $scope.toDelete = function(nm){
    var pos = $scope.histories.findIndex( history => history.id === nm );
    $scope.histories.splice(pos, 1);
    };

    $scope.checkInput = function(){
    if (!$scope.newHistory) return true;
    return false;
    };    
 });