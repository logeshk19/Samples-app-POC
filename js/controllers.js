var pocControllers = angular.module('pocControllers', []);


/******************************************* FACTORY ***********************************************************************/

pocControllers.factory("pocData", ['$http', function($http){
  var pocData = {};
  /*Checking if the object is empty i.e. is this a first time load*/
 if(Object.keys(pocData).length == 0) {
     $http.get('js/pocData.json').success(function(data) { 
      pocData.locationData = data.locationData;
      pocData.floorData = data.floorData;
      pocData.roomData = data.roomData;
      pocData.levelFourData = data.levelFourData;
      pocData.levelFiveData = data.levelFiveData;
    });
   }
  return pocData;
}]);

/****************************************** FACTORY TILL HERE *************************************************************/



/******************************************* LOCATION CONTROLLER *************************************************************/
pocControllers.controller('LocationController', ['$scope', '$http', '$location', 'pocData', function($scope, $http, $location, pocData ){
  $scope.isEditing = false;
  $scope.addText = "Add building";
  $scope.pocData = pocData;

  if(Object.keys($scope.pocData).length == 0) {
     $http.get('js/pocData.json').success(function(data) { 
      $scope.pocData.locationData = data.locationData;
      $scope.pocData.floorData = data.floorData;
      $scope.pocData.roomData = data.roomData;
      $scope.pocData.levelFourData = data.levelFourData;
      $scope.pocData.levelFiveData = data.levelFiveData;
    });
   }

  $scope.removeRow = function(locId){
      var index = -1;   
    for( var i = 0; i < $scope.pocData.locationData.length; i++ ) {
      if( $scope.pocData.locationData[i].locId === locId ) {
        index = i;
        break;
      }
    }
    $scope.pocData.locationData.splice( index, 1 );  
  };

  $scope.editLocation = function(e){
    $scope.editText = $scope.editText == "edit" ? "done" : "edit";
    $scope.pocData.locationData[e].isEditing =  !$scope.pocData.locationData[e].isEditing;  
  }

  $scope.clickBuilding = function(location){
     $scope.resetIsEditing();
     $location.path("floors/" + location.locId);
  }

$scope.resetIsEditing = function(){
     $scope.pocData.locationData.every(function(obj){
      obj.isEditing=false;
      })
  }

/*Function to add a record*/
  $scope.addBuilding = function(){
  
    var checkRequired = true;
    var ranNum = 0;
    while(checkRequired){
     ranNum = Math.floor((Math.random() * 100) + 1);

      var res = $scope.pocData.lo



      cationData.filter(function(obj){
      return obj.locId == ranNum;
      }); 

      checkRequired = res.length == 0 ? false : true;
    }

      $scope.pocData.locationData.unshift({"buildingName" :  "",
      "address" : "",
       "locId"  : ranNum,
       "isEditing" : true});
    };
}]);

/****************************************** LOCATION CONTROLLER TILL HERE **************************************************/



/******************************************* FLOORS CONTROLLER *************************************************************/
pocControllers.controller('FloorController', ['$scope', '$http', '$location', '$routeParams', 'pocData', function($scope, $http, $location,  $routeParams, pocData){
  $scope.locationId = $routeParams.locId;
  $scope.pocData = pocData;

  $scope.initialize = function(flag){
  if(flag){
  $scope.buildingInfo = $scope.pocData.locationData.filter(function(obj){
    return obj.locId == $scope.locationId;
  });

  $scope.clickFloor = function(floor){
    $scope.resetIsEditing();
     $location.path("rooms/" + floor.floorId);
  }

  $scope.resetIsEditing = function(){
     $scope.pocData.floorData.every(function(obj){
      obj.isEditing=false;
      })
  }

  /*Function to add a record*/
  $scope.addFloor = function(){
  
    var checkRequired = true;
    var ranNum = 0;
    while(checkRequired){
     ranNum = Math.floor((Math.random() * 100) + 1);

      var res = $scope.pocData.floorData.filter(function(obj){
      return obj.floorId == ranNum;
      }); 

      checkRequired = res.length == 0 ? false : true;
    }

      $scope.pocData.floorData.unshift({"floorName" : "",
        "address" : "",
        "floorId" : ranNum,
        "locId" : $scope.locationId,
        "isEditing" : true
      });
    }

    $scope.editFloor = function(floorId){
      for(var i=0; i < $scope.pocData.floorData.length; i++){
        if($scope.pocData.floorData[i].floorId == floorId){
          $scope.pocData.floorData[i].isEditing =  !$scope.pocData.floorData[i].isEditing; 
        }
      }  
    }

  $scope.removeRow = function(floorId){
      var index = -1;   
    for( var i = 0; i < $scope.pocData.floorData.length; i++ ) {
      if( $scope.pocData.floorData[i].floorId === floorId ) {
        index = i;
        break;
      }
    }
    $scope.pocData.floorData.splice( index, 1 );   
  };

$scope.returnToBuildings = function () {
  $scope.resetIsEditing();
  $location.path("/main");
};  
  }
}

if(Object.keys($scope.pocData).length == 0) {
     $http.get('js/pocData.json').success(function(data) { 
      $scope.pocData.locationData = data.locationData;
      $scope.pocData.floorData = data.floorData;
      $scope.pocData.roomData = data.roomData;
      $scope.pocData.levelFourData = data.levelFourData;
      $scope.pocData.levelFiveData = data.levelFiveData;
      $scope.initialize(true);
    });
   } else {
    $scope.initialize(true);
   }
 
}]);

/****************************************** FLOORS CONTROLLER TILL HERE ****************************************************/

/******************************************* ROOMS CONTROLLER *************************************************************/
pocControllers.controller('RoomController', ['$scope', '$http', '$location', '$routeParams', 'pocData', function($scope, $http, $location, $routeParams, pocData){
  $scope.floorId = $routeParams.floorId;
  $scope.pocData = pocData;

$scope.initialize = function(flag){
  if(flag){
    $scope.floorInfo = $scope.pocData.floorData.filter(function(obj){
    return obj.floorId == $scope.floorId;
  });

    $scope.resetIsEditing = function(){
     $scope.pocData.roomData.every(function(obj){
      obj.isEditing=false;
      })
  }

  $scope.clickRoom = function(room){
    $scope.resetIsEditing();
     $location.path("levelFour/" + room.roomId);
  }

/*Function to add a record*/
  $scope.addRoom = function(){
  
    var checkRequired = true;
    var ranNum = 0;
    while(checkRequired){
     ranNum = Math.floor((Math.random() * 100) + 1);

      var res = $scope.pocData.roomData.filter(function(obj){
      return obj.roomId == ranNum;
      }); 

      checkRequired = res.length == 0 ? false : true;
    }

      $scope.pocData.roomData.unshift({"floorId" : $scope.floorId,
        "roomId" : ranNum,
        "roomName" : "",
        "address" : "",
        "isEditing" : true
      });
    }

  $scope.editRoom = function(roomId){
      for(var i=0; i < $scope.pocData.roomData.length; i++){
        if($scope.pocData.roomData[i].roomId == roomId){
          $scope.pocData.roomData[i].isEditing =  !$scope.pocData.roomData[i].isEditing; 
        }
      }  
    }

  $scope.removeRow = function(roomId){
      var index = -1;   
    for( var i = 0; i < $scope.pocData.roomData.length; i++ ) {
      if( $scope.pocData.roomData[i].roomId === roomId ) {
        index = i;
        break;
      }
    }
    $scope.pocData.roomData.splice( index, 1 );   
  };

  $scope.returnToFloors = function () {
    $scope.resetIsEditing();
    $location.path("/floors/" + $scope.floorInfo[0].locId);
  }
  }
}


  if(Object.keys($scope.pocData).length == 0) {
     $http.get('js/pocData.json').success(function(data) { 
      $scope.pocData.locationData = data.locationData;
      $scope.pocData.floorData = data.floorData;
      $scope.pocData.roomData = data.roomData;
      $scope.pocData.levelFourData = data.levelFourData;
      $scope.pocData.levelFiveData = data.levelFiveData;
      $scope.initialize(true);
    });
   } else {
    $scope.initialize(true);
   }

  

}]);

/****************************************** ROOMS CONTROLLER TILL HERE ****************************************************/

/******************************************* LEVEL FOUR CONTROLLER *************************************************************/
pocControllers.controller('LevelFourController', ['$scope', '$http', '$location', '$routeParams', 'pocData', function($scope, $http, $location, $routeParams, pocData){
  $scope.roomId = $routeParams.roomId;
  $scope.pocData = pocData;
  
$scope.initialize = function(flag){
  if(flag){
    $scope.roomInfo = $scope.pocData.roomData.filter(function(obj){
    return obj.roomId == $scope.roomId;
  });

  $scope.clickItem = function(item){
     $scope.pocData.levelFourData[$scope.lastEditIndex].isEditing = false;
     $location.path("levelFive/" + item.levelFourId);
  }

  $scope.resetIsEditing = function(){
     $scope.pocData.levelFourData.every(function(obj){
      obj.isEditing=false;
      })

/*Function to add a record*/
  $scope.addLevelFour = function(){
  
    var checkRequired = true;
    var ranNum = 0;
    while(checkRequired){
     ranNum = Math.floor((Math.random() * 100) + 1);

      var res = $scope.pocData.levelFourData.filter(function(obj){
      return obj.levelFourId == ranNum;
      }); 

      checkRequired = res.length == 0 ? false : true;
    }

      $scope.pocData.levelFourData.unshift({"roomId" :  $scope.roomId,
        "levelFourId" : ranNum,
        "levelFourName" : "",
        "levelFourAddress" : "",
        "isEditing" : true
      });
    }

  $scope.editItem = function(levelFourId){
      for(var i=0; i < $scope.pocData.levelFourData.length; i++){
        if($scope.pocData.levelFourData[i].levelFourId == levelFourId){
          $scope.pocData.levelFourData[i].isEditing =  !$scope.pocData.levelFourData[i].isEditing; 
        }
      }  
    }

  $scope.removeRow = function(levelFourId){
      var index = -1;   
    for( var i = 0; i < $scope.pocData.levelFourData.length; i++ ) {
      if( $scope.pocData.levelFourData[i].levelFourId === levelFourId ) {
        index = i;
        break;
      }
    }
    $scope.pocData.levelFourData.splice( index, 1 );   
  };

  $scope.returnToRooms = function () {
    $scope.resetIsEditing();
  $location.path("/rooms/" + $scope.roomInfo[0].floorId);
};
  }
}
}

  if(Object.keys($scope.pocData).length == 0) {
     $http.get('js/pocData.json').success(function(data) { 
      $scope.pocData.locationData = data.locationData;
      $scope.pocData.floorData = data.floorData;
      $scope.pocData.roomData = data.roomData;
      $scope.pocData.levelFourData = data.levelFourData;
      $scope.pocData.levelFiveData = data.levelFiveData;
      $scope.initialize(true);
    });
   } else {
    $scope.initialize(true);
   }

}]);

/****************************************** LEVEL FOUR CONTROLLER TILL HERE ***********************************************/



/******************************************* LEVEL FIVE CONTROLLER *************************************************************/
pocControllers.controller('LevelFiveController', ['$scope', '$http', '$location', '$routeParams', 'pocData', function($scope, $http, $location, $routeParams, pocData){
  $scope.levelFourId = $routeParams.levelFourId;
  $scope.pocData = pocData;
  

  $scope.initialize =function(flag){
    if(flag){
$scope.levelFourInfo = $scope.pocData.levelFourData.filter(function(obj){
    return obj.levelFourId == $scope.levelFourId;
  });



/*Function to add a record*/
  $scope.addLevelFive = function(){
  
    var checkRequired = true;
    var ranNum = 0;
    while(checkRequired){
     ranNum = Math.floor((Math.random() * 100) + 1);

      var res = $scope.pocData.levelFiveData.filter(function(obj){
      return obj.levelFiveId == ranNum;
      }); 

      checkRequired = res.length == 0 ? false : true;
    }

      $scope.pocData.levelFiveData.unshift({"levelFourId" : $scope.levelFourId,
        "levelFiveId" : ranNum,
        "levelFiveName" : "",
        "levelFiveAddress" : "",
        "isEditing" : true
      });
    }

    $scope.resetIsEditing = function(){
     $scope.pocData.levelFiveData.every(function(obj){
      obj.isEditing=false;
      })

  $scope.editItem = function(levelFiveId){
      for(var i=0; i < $scope.pocData.levelFiveData.length; i++){
        if($scope.pocData.levelFiveData[i].levelFiveId == levelFiveId){
          $scope.pocData.levelFiveData[i].isEditing =  !$scope.pocData.levelFiveData[i].isEditing; 
        }
      }  
    }

  $scope.removeRow = function(levelFiveId){
      var index = -1;   
    for( var i = 0; i < $scope.pocData.levelFiveData.length; i++ ) {
      if( $scope.pocData.levelFiveData[i].levelFiveData === levelFiveId ) {
        index = i;
        break;
      }
    }
    $scope.pocData.levelFiveData.splice( index, 1 );   
  };

  $scope.returnToLevelFour = function () {
    $scope.resetIsEditing();
  $location.path("/levelFour/" + $scope.levelFourInfo[0].roomId);
};
    }
  }

  if(Object.keys($scope.pocData).length == 0) {
     $http.get('js/pocData.json').success(function(data) { 
      $scope.pocData.locationData = data.locationData;
      $scope.pocData.floorData = data.floorData;
      $scope.pocData.roomData = data.roomData;
      $scope.pocData.levelFourData = data.levelFourData;
      $scope.pocData.levelFiveData = data.levelFiveData;
      $scope.initialize(true);
    });
   } else {
    $scope.initialize(true);
   }
 }


}]);

/****************************************** LEVEL FIVE CONTROLLER TILL HERE ***********************************************/


/****************************************** ORDER ITEM CONTROLLER **********************************************************/

pocControllers.controller('OrderItemController', ['$scope', '$http', '$location', '$routeParams',  function($scope, $http, $location, $routeParams, pocData){
 }]);

/****************************************** ORDER ITEM CONTROLLER TILL HERE ************************************************/


/****************************************** FILTERS AND DIRECTIVES ************************************************************/
pocControllers.filter('searchFor', function(){
    return function(arr, searchText, searchField){
        if(!searchText){
            return arr;
        }
        var result = [];
        var val = "";
        searchText = searchText.toLowerCase();
        angular.forEach(arr, function(item){
          switch(searchField){
            case "building":
             val = item.buildingName;
             break;

              case "rooms":
             val = item.roomName;
             break;

              case "floors":
             val = item.floorName;
             break;

              case "searchLevelFour":
             val = item.levelFourName;
             break;

              case "searchLevelFive":
             val = item.levelFiveName;
             break;

              case "default":
             val = item.buildingName;
             break;
          }
            if(val.toLowerCase().indexOf(searchText) !== -1){
            result.push(item);
        }
        });
        return result;
    };
});

/*pocControllers.directive('optionsClass', function ($parse) {
  return {
    require: 'select',
    link: function(scope, elem, attrs, ngSelect) {
      var optionsSourceStr = attrs.ngOptions.split(' ')[4],
          getOptionsClass = attrs.optionsClass;
          
      scope.$watch(optionsSourceStr, function(items) {
        angular.forEach(items, function(item, index) {
          var option = elem.find('option')[index];
              angular.element(option).addClass(getOptionsClass); 
        });
      });
    }
  };
});*/

/****************************************** FILTERS AND DIRECTIVES  TILL HERE ******************************************/