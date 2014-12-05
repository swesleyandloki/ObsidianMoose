var loc = {};

var savePosition = function(position){
  	loc.latitude = position.coords.latitude;
  	loc.longitude = position.coords.longitude;
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
  // $scope.position = position;
  // var savePosition = function(position){
  // 	$scope.position.latitude = position.coords.latitude;
  // 	$scope.position.longitude = position.coords.longitude;
  // }
  // var logErr = function(){
  // 	console.log('BALLSBALLSBALLS');
  // }
  // var getLocation = function(){
  // 	if (navigator.geolocation){
  // 		navigator.geolocation.getCurrentPosition(savePosition,logErr);
  // 	}
  // }
  // getLocation();
 
  $scope.stars = '3';
  $scope.distance = '2.5';
  $scope.loc = loc;
  $scope.feedMe = function(){
  	var foodObj = {};
  	foodObj['search'] = $scope.search;
  	foodObj['stars'] = parseInt($scope.stars);
  	foodObj['distance'] = parseFloat($scope.distance);
  	foodObj['loc'] = $scope.loc;
  	console.log("I'm a food Object!", foodObj)
  }
  $scope.moStars = function(){ 
  	var num = parseInt($scope.stars) || 1;
  	console.log('NUMNUMNUM', num);
    return new Array(num);	
  }
  $scope.moStars();
})