// angular.module("kanbanApp").controller("boardCtl", function($scope){  
      
      

//     $scope.allowDrop = function(ev){        
//         ev.preventDefault();                
//     };  

//     $scope.drag = function(ev){        
//         ev.dataTransfer.setData("text", ev.target.id);               
//     };  

//     $scope.drop = function(ev){        
//         console.log(ev.target.id);
//         vObj = ev.target.id;        
       
//        if (vObj.indexOf("div") == 0) {
//         ev.preventDefault();
//         var data = ev.dataTransfer.getData("text");
//         ev.target.appendChild(document.getElementById(data));     
//        }          
//     };  



      function allowDrop(ev) {
        ev.preventDefault();
      }
      
      function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      }
      
      function drop(ev) {
        
        console.log(ev.target.id);
        vObj = ev.target.id;
        
       
       if (vObj.indexOf("div") == 0) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
      }
      }


