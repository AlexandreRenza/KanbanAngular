angular.module("kanbanApp").controller('modalContentCtl', function($scope, $uibModalInstance) {
  
    $scope.ok = function(){
      $uibModalInstance.close("Ok");
    }
     
    $scope.cancel = function(){
      $uibModalInstance.dismiss();
    } 
    
  });