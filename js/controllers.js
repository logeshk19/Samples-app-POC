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


pocControllers.controller('FloorController', ['$scope', '$http', function($scope, $http){
$scope.floorData = [{
    'floorName' : 'CC-512',
    'address' : 'US',
    'locId' : '0',
    'isEditing' : false
  },
  {
    'buildingName' : 'Target Plaza 3(TP3)',
    'address' : 'US',
    'locId' : '1',
    'isEditing' : false
  },
  {
    'buildingName' : 'Target Plaza North(TPN)',
    'address' : 'US',
    'locId' : '2',
    'isEditing' : false
  },
  {
    'buildingName' : 'Target Plaza South(TPS)',
    'address' : 'US',
    'locId' : '3',
    'isEditing' : false
  },
  {
    'buildingName' : 'N.E Target Photo Studio',
    'address' : 'US',
    'locId' : '4',
    'isEditing' : false
  },
  {
    'buildingName' : '#6 Shanghai',
    'address' : 'China',
    'locId' : '5',
    'isEditing' : false
  },
  {
    'buildingName' : 'Fox Studio',
    'address' : 'US',
    'locId' : '6',
    'isEditing' : false
  }];
}]);
