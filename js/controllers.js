var pocControllers = angular.module('pocControllers', []);


/******************************************* FACTORY ***********************************************************************/

pocControllers.factory("pocData", function(){
  return {};
});

/****************************************** FACTORY TILL HERE *************************************************************/



/******************************************* LOCATION CONTROLLER *************************************************************/
pocControllers.controller('LocationController', ['$scope', '$http', '$location', 'pocData', function($scope, $http, $location, pocData ){
  $scope.isEditing = false;
  $scope.pocData = pocData;

  /*Checking if the object is empty i.e. is this a first time load*/
 if(Object.keys(pocData).length == 0) {
     $http.get('js/pocData.json').success(function(data) { 
      $scope.pocData.locationData = data.locationData;
      $scope.pocData.floorData = data.floorData;
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
     $location.path("floors/" + location.locId);
  }


/*Function to add a record*/
  $scope.addBuilding = function(){
  
    var checkRequired = true;
    var ranNum = 0;
    while(checkRequired){
     ranNum = Math.floor((Math.random() * 100) + 1);

      var res = $scope.pocData.locationData.filter(function(obj){
      return obj.locId == ranNum;
      }); 

      checkRequired = res.length == 0 ? false : true;
    }

      $scope.pocData.locationData.unshift({"buildingName" :  "",
      "address" : "",
       "locId"  : ranNum,
       "isEditing" : true
     });
    };
}]);

/****************************************** LOCATION CONTROLLER TILL HERE **************************************************/



/******************************************* FLOORS CONTROLLER *************************************************************/
pocControllers.controller('FloorController', ['$scope', '$http', '$routeParams', 'pocData', function($scope, $http, $routeParams, pocData){
  $scope.locationId = $routeParams.locId;
  $scope.pocData = pocData;
  $scope.buildingInfo = $scope.pocData.locationData.filter(function(obj){
    return obj.locId == $scope.locationId;
  });

  $scope.floors = $scope.pocData.floorData.filter(function(obj){
    return obj.locId == $scope.locationId;
  });

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

      $scope.floors = $scope.pocData.floorData.filter(function(obj){
        return obj.locId == $scope.locationId;
      }); 
    }

    $scope.editFloor = function(floorId){
      for(var i=0; i < $scope.pocData.floorData.length; i++){
        if($scope.pocData.floorData[i].floorId == floorId){
          $scope.pocData.floorData[i].isEditing =  !$scope.pocData.floorData[i].isEditing; 
        }
      }
      
      $scope.floors = $scope.pocData.floorData.filter(function(obj){
        return obj.locId == $scope.locationId;
      });  
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

    $scope.floors = $scope.pocData.floorData.filter(function(obj){
        return obj.locId == $scope.locationId;
      });  
  };

  
}]);

/****************************************** FLOORS CONTROLLER TILL HERE ****************************************************/

