var myApp = angular.module('myApp', [
  'ngRoute',
  'pocControllers'
]);

myApp.controller("MainController", ['$scope',  '$location',  function($scope, $location){
  $scope.actions = [{
    "name" : "location information",
  },
  {
    "name" : "order item"
  }]
  $scope.actionSelected = $scope.actions[0];
  $scope.changeEvent = function(item){
   if ($scope.actionSelected.name == "order item"){
      $location.path("orderItem");
    } else {
      $location.path("main" );
    }
  }
}]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/list', {
    templateUrl: 'partials/list.html',
    controller: 'ListController'
  }).
  when('/details/:itemId', {
    templateUrl: 'partials/details.html',
    controller: 'DetailsController'
  }).
  when('/main', {
    templateUrl: 'partials/locationDetails.html',
    controller: 'LocationController'
  }).
  when('/floors/:locId', {
    templateUrl: 'partials/floorDetails.html',
    controller: 'FloorController'
  }).
  when('/rooms/:floorId', {
    templateUrl : 'partials/roomDetails.html',
    controller : 'RoomController'
  }).
  when('/levelFour/:roomId', {
    templateUrl : 'partials/levelFourDetails.html',
    controller : 'LevelFourController'
  }).
  when('/levelFive/:levelFourId', {
    templateUrl : 'partials/levelFiveDetails.html',
    controller : 'LevelFiveController'
  }).
  when('/orderItem', {
    templateUrl : 'partials/orderItem.html',
    controller : 'OrderItemController'
  }).
  otherwise({
    redirectTo: '/main'
  });
}]);

