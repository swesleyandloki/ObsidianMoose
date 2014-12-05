angular.module('EAT', [
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('search', {
      templateUrl:'search.html',
      controller: 'SearchController',
      url: '/search',
      // authenticate: true
    })
    // .state('likes', {
    //   templateUrl:'likes.html',
    //   controller: 'ListController',
    //   url: '/likes',
    //   // authenticate: true
    // })
    // 
    // .state('login',{
    //   templateUrl:'login.html',
    //   controller: 'AuthController',
    //   url: '/login',
    // })
    // .state('signup',{
    //   templateUrl:'signup.html',
    //   controller: 'AuthController',
    //   url: '/signup',
    // })
    
  })

.controller('SearchController', function($scope){
  $scope.position = {};
  var savePosition = function(){
  	$scope.position.latitude = position.coords.latitude;
  	$scope.position.longitude = position.coords.longitude;
  }
  var logErr = function(){
  	console.log('BALLSBALLSBALLS');
  }
  var getLocation = function(){
  	if (navigator.geolocation){
  		navigator.geolocation.getCurrentPosition(savePosition,logErr);
  	}
  }
  getLocation();
  $scope.food = {};
  $scope.food.loc = $scope.position;
  $scope.feedMe = function(){
  	var foodObj = $scope.food;
  	console.log("I'm a food Object!", foodObj)
  }
  $scope.dollaDollaBillz = '$$';
  $scope.moMoney = function(){ 
  	console.log($scope.food);
    if($scope.food.cost==='1'){
    	console.log($scope.food.cost);
    	console.log($scope.dollaDollaBillz);
    	$scope.dollaDollaBillz='$';
    }
    if($scope.food.cost==='2'){
    	console.log($scope.food.cost);
    	console.log($scope.dollaDollaBillz);
    	$scope.dollaDollaBillz='$$';
    }
    if($scope.food.cost==='3'){
    	console.log($scope.food.cost);
    	console.log($scope.dollaDollaBillz);
    	$scope.dollaDollaBillz='$$$';
    }
    if($scope.food.cost==='4'){
    	console.log($scope.food.cost);
    	console.log($scope.dollaDollaBillz);
    	$scope.dollaDollaBillz='$$$$';
    }	
  }
})