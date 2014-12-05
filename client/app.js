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
  'ui.router',
  'EAT.services'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('search', {
      templateUrl:'search.html',
      controller: 'SearchController',
      url: '/search',
      // authenticate: true
    })
    .state('likes', {
      templateUrl:'likes.html',
      controller: 'ListController',
      url: '/likes',
      // authenticate: true
    })
    
    .state('login',{
      templateUrl:'login.html',
      controller: 'AuthController',
      url: '/login',
    })
    .state('signup',{
      templateUrl:'signup.html',
      controller: 'AuthController',
      url: '/signup',
    })
    .state('searchResults', {
      templateUrl:'searchResults.html',
      controller: 'searchController',
      url: '/searchResults',
    })
		
    
  })

.controller('SearchController', function($scope){
  $scope.stars = '3';
  $scope.distance = '2.5';
  $scope.loc = loc;
  $scope.feedMe = function(){
  	var foodObj = {};
  	foodObj['search'] = $scope.search;
  	foodObj['stars'] = parseInt($scope.stars);
  	foodObj['distance'] = parseFloat($scope.distance);
  	foodObj['loc'] = $scope.loc;
  	console.log("I'm a food Object!", foodObj);
  	state.go('searchResults');
  // 	Search.add(foodObj);  //post method in factory FIX THE PROMISES!!!
  // }
  $scope.moStars = function(){ 
  	var num = parseInt($scope.stars) || 1;
  	console.log('NUMNUMNUM', num);
    return new Array(num);	
  }
  $scope.moStars();
  $scope.displayResults = function(){
    //todo: fix me!
    // Search.get();  //get method in factory! FIX THE PROMISES!!!
  };
})

.controller('AuthController', function($scope){
  $scope.user = {};
  $scope.newUser = {};
  $scope.sendSignup = function(){
  	console.log($scope.newUser);
  	//User.add($scope.newUser);  post method in factory!
  }
  $scope.sendLogin = function(){
  	console.log($scope.user);
  	//User.add($scope.user);  post method in factory!
  }
})