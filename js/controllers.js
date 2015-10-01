var artistControllers = angular.module('artistControllers', ['ngAnimate']);
var pocControllers = angular.module('pocControllers', []);

artistControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data.json').success(function(data) {
    $scope.artists = data;
    $scope.artistOrder = 'name';
  });
}]);

artistControllers.controller('DetailsController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  $http.get('js/data.json').success(function(data) {
    $scope.artists = data;
    $scope.whichItem = $routeParams.itemId;

    if ($routeParams.itemId > 0) {
      $scope.prevItem = Number($routeParams.itemId)-1;
    } else {
      $scope.prevItem = $scope.artists.length-1;
    }

    if ($routeParams.itemId < $scope.artists.length-1) {
      $scope.nextItem = Number($routeParams.itemId)+1;
    } else {
      $scope.nextItem = 0;
    }

  });
}]);


pocControllers.controller('LocationController', ['$scope', '$http', '$location', function($scope, $http, $location ){
  $scope.isEditing = false;
   $http.get('js/pocData.json').success(function(data) {
    $scope.locationData = data.locationData;
  });
  

  $scope.removeRow = function(locId){
      var index = -1;   
    for( var i = 0; i < $scope.locationData.length; i++ ) {
      if( $scope.locationData[i].locId === locId ) {
        index = i;
        break;
      }
    }
    $scope.locationData.splice( index, 1 );  
  };

  $scope.editLocation = function(e){
    $scope.editText = $scope.editText == "edit" ? "done" : "edit";
    $scope.locationData[e].isEditing =  !$scope.locationData[e].isEditing;  
  }

  $scope.clickBuilding = function(location){
    $location.path("floors/" + location.locId);
  }
}]);


pocControllers.controller('FloorController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
  $scope.locationId = $routeParams.locId;
 $http.get('js/pocData.json').success(function(data) {
    $scope.buildingInfo = data.locationData.filter(function(obj){
      return obj.locId == $scope.locationId;
    });

    $scope.floorDetails = data.floorData.filter(function(obj){
      return obj.locId == $scope.locationId;
    });
  }); 
}]);

