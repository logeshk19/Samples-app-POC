/**************************************** ORDER ITEM CONTROLLER **********************************************************/

pocControllers.controller('OrderItemController', ['$scope', '$http', '$route', '$location', '$routeParams',  function($scope, $http, $route, $location, $routeParams, pocData){
	/*$scope.showFilters = false;*/
  $scope.addedFilters = [];
  	$scope.filterList = [{
		"filterName" : "test",
		"filterType" : "input",
    "val" : "test"
	},
  {
    "filterName" : "test1",
    "filterType" : "input",
    "val" : "test1"
  },
	{
		"filterName" : "abc",
		"filterType" : "input",
    "val" : "abc"
	}];


  $scope.clearFilters = function(){
    $route.reload();
  }

  $scope.removeFilter = function(index){
    $scope.addedFilters.splice(index, 1);
  }

  $scope.addFilter = function(val, key, scope){

    var ind = -1;
    var foundFilter = $scope.addedFilters.filter(function(obj, index){
      ind = index;
      return obj.filterName == key;
    })[0];

    if(foundFilter){
      $scope.addedFilters[ind].filterValue = val;
    } else {
      $scope.addedFilters.push({"filterName" : key, "filterValue" : val});
    }
  }

 }]);

/****************************************** ORDER ITEM CONTROLLER TILL HERE ************************************************/

/****************************************** FILTERS AND DIRECTIVES ************************************************************/
pocControllers.filter('searchFilters', function(){
    return function(arr, searchText, $scope){
        if(!searchText){
        	/*$scope.showFilters = false;*/
            return arr;
        }
        var result = [];
        var val = "";
        searchText = searchText.toLowerCase();
        angular.forEach(arr, function(item){
          
            if(item.filterName.toLowerCase().indexOf(searchText) !== -1){
            	result.push(item);
        	} 
        });

       /* result.length > 0 ? $scope.showFilters = true : $scope.showFilters = false;*/
        return result;
    };
});

pocControllers.filter('capitalize', function() {
  'use strict'
   return function(token) {
      return token.charAt(0).toUpperCase() + token.slice(1);
   }
});


/****************************************** FILTERS AND DIRECTIVES  TILL HERE ****************************************/