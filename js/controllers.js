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


pocControllers.controller('LocationController', ['$scope', '$http', function($scope, $http){
  $scope.showFloorInput = false;
  $scope.addButtonText = "floors";
  $scope.locationData = [{
    'buildingName' : 'City Center(CC)',
    'address' : 'US',
    'locId' : '0'
  },
  {
    'buildingName' : 'Target Plaza 3(TP3)',
    'address' : 'US',
    'locId' : '1'
  },
  {
    'buildingName' : 'Target Plaza North(TPN)',
    'address' : 'US',
    'locId' : '2'
  },
  {
    'buildingName' : 'Target Plaza South(TPS)',
    'address' : 'US',
    'locId' : '3'
  },
  {
    'buildingName' : 'N.E Target Photo Studio',
    'address' : 'US',
    'locId' : '4'
  },
  {
    'buildingName' : '#6 Shanghai',
    'address' : 'China',
    'locId' : '5'
  },
  {
    'buildingName' : 'Fox Studio',
    'address' : 'US',
    'locId' : '6'
  }];

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

  $scope.editLocation = function(locId){
    $scope.showFloorInput = true;
    $scope.addButtonText = "done";
  }
}]);
