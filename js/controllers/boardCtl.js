angular.module("kanbanApp").controller("boardCtl", function($scope, projectsApiService, historiesApiService) {

  $scope.sprints = [];


  var loadSprints = function(){

    projectsApiService.getProjectsByID(sessionStorage.getItem("project_id")).then(function(response){             
      $scope.sprints = response.data;             
    });

  };


  var loadBoard = function(){

    $scope.models = [
      {listName: "To Do", items: [], dragging: false},
      {listName: "In Progress", items: [], dragging: false},
      {listName: "Done", items: [], dragging: false}
    ];

    console.log("loading..");
    console.log($scope.models.length);

    historiesApiService.getHistoriesOnBoard($scope.sprintList.id).then(function(response){

      if(response.data.histories.length == 0){
        $scope.NoHistories = "No Histories to Select!";
        console.log($scope.NoHistories);
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
          
          //console.log("entrou not null");
          //$scope.historiesFilter.push({id:response.data.histories[i].id,
          //                             name: response.data.histories[i].name, 
          //                             selected: true});       
         
          insertScreenBoard(response.data.histories[i].implStatus, response.data.histories[i].name,response.data.histories[i].id );
    
          }
      }
    })
  };



  /**
   * dnd-dragging determines what data gets serialized and send to the receiver
   * of the drop. While we usually just send a single object, we send the array
   * of all selected items here.
   */
  $scope.getSelectedItemsIncluding = function(list, item) {
    item.selected = true;
    return list.items.filter(function(item) { return item.selected; });
  };

  /**
   * We set the list into dragging state, meaning the items that are being
   * dragged are hidden. We also use the HTML5 API directly to set a custom
   * image, since otherwise only the one item that the user actually dragged
   * would be shown as drag image.
   */
  $scope.onDragstart = function(list, event) {
     list.dragging = true;
     if (event.dataTransfer.setDragImage) {
       var img = new Image();
       img.src = 'framework/vendor/ic_content_copy_black_24dp_2x.png';
       event.dataTransfer.setDragImage(img, 0, 0);
     }
  };

  /**
   * In the dnd-drop callback, we now have to handle the data array that we
   * sent above. We handle the insertion into the list ourselves. By returning
   * true, the dnd-list directive won't do the insertion itself.
   */
  $scope.onDrop = function(list, items, index) {
    angular.forEach(items, function(item) {

      historiesApiService.putHistoriesImpl(list.listName, item.id);
      item.selected = false; });

    list.items = list.items.slice(0, index)
                .concat(items)
                .concat(list.items.slice(index));
    return true;
  }

  /**
   * Last but not least, we have to remove the previously dragged items in the
   * dnd-moved callback.
   */
  $scope.onMoved = function(list) {
    list.items = list.items.filter(function(item) { return !item.selected; });
  };

  // Generate the initial model
  //angular.forEach($scope.models, function(list) {
  //    for (var i = 1; i <= 4; ++i) {
  //      list.items.push({label: "Item " + list.listName + i});
  //  }
 // });

  // Model to JSON for demo purpose
  $scope.$watch('models', function(model) {
      $scope.modelAsJson = angular.toJson(model, true);
  }, true);

  loadSprints();

  $scope.setSprintChange = function(){
        loadBoard();
  }

  var insertScreenBoard = function(implStatus, HistoryName, HistoryId){
    //list.items.push({label: history });
    
    switch(implStatus) {
      case "To Do":
        model = 0
        break;
      case "In Progress":
        model = 1
        break;
      default:
        model = 2
    }
    $scope.models[model].items.push({label:HistoryName, id:HistoryId, implStatus:implStatus})   
  }


});