/**************************************** ORDER ITEM CONTROLLER **********************************************************/

pocControllers.controller('OrderItemController', ['$scope', '$http', '$route', '$location', '$routeParams', 'pocData',  function($scope, $http, $route, $location, $routeParams, pocData){
  $scope.filterObj = {"vendorId" : "", "trackingNo" : "","trackingLocation" : "", "brand" : "", "projectStatus":"Select"};

  $scope.pocData = pocData;

  $scope.dept = "Any department";
  $scope.addedFilters = [];


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

  $scope.submitFilters = function(){
     

  for(var i=0; i < $scope.addedFilters.length; i++){
    $scope.filterObj[$scope.addedFilters[i].filterName] = $scope.addedFilters[i].filterValue;
  }


     if($scope.dept != "Any department"){
        $scope.filterObj.dept = $scope.dept;
     }

    if($scope.tcin != "" && $scope.tcin != undefined){
      $scope.filterObj.tcin = $scope.tcin;
    }

    if($scope.containerId != "" && $scope.containerId != undefined){
      $scope.filterObj.containerId = $scope.containerId;
    }

    if($scope.sampleId != "" && $scope.sampleId != undefined){
      $scope.filterObj.sampleId = $scope.sampleId;
    }

    if($scope.dpci != "" && $scope.dpci != undefined){
      $scope.filterObj.dpci = $scope.dpci;
    }

    

  $scope.pocData.resultItems = [];
    $scope.pocData.itemList.filter(function(obj){
      var flag = true;
      for(var key in $scope.filterObj){

        if(obj[key] ==  undefined || $scope.filterObj[key] == "" || $scope.filterObj[key] == "Select"){
          flag = flag && true;
        } else if (obj[key].replace("-", "").toLowerCase() ==  $scope.filterObj[key].replace("-", "").toLowerCase()){
          flag = flag && true;
        }else {
          flag = false;
        }

      }
      if(flag){
        $scope.pocData.resultItems.push(obj);
      }
    });
  
  $location.path("itemResults");

  }

 }]);

/****************************************** ORDER ITEM CONTROLLER TILL HERE ************************************************/

/**************************************** ITEMS CONTROLLER **********************************************************/

pocControllers.controller('ItemsController', ['$scope', '$http', '$route', '$location', '$routeParams', 'pocData',  function($scope, $http, $route, $location, $routeParams, pocData){
  /*$scope.showFilters = false;*/ 

  $scope.pocData = pocData;
  $scope.pocData.resultItems = pocData.resultItems;

if($routeParams.itemId != ""  && $routeParams.itemId != undefined){
    $scope.itemDetails = $scope.pocData.resultItems.filter(function(obj){
      return obj.itemId == $routeParams.itemId; 
    });
  }


  $scope.backToFilters = function(){
    $location.path('/orderItem');
  }

  $scope.placeOrder = function(){
   $location.path('/orderConfirmation'); 
  }

  $scope.itemClick = function(itemId){
     $location.path('/itemDetails/' + itemId);
  }

 }]);

/****************************************** ITEMS CONTROLLER TILL HERE ************************************************/




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