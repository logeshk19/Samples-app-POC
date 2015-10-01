var myApp = angular.module('myApp', [
  'ngRoute',
  'artistControllers',
  'pocControllers'
]);

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
  otherwise({
    redirectTo: '/main'
  });
}]);