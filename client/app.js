var loc = {};

var savePosition = function(position){
  	loc.latitude = parseFloat(position.coords.latitude);
  	loc.longitude = parseFloat(position.coords.longitude);
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
      
    })
    .state('likes', {
      templateUrl:'favorites.html',
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

//This controller is for our search ui-view and the searchResults ui-view:
.controller('SearchController', function(Search, $scope){
  //This instantiates view so it looks pretty:
  $scope.stars = '3';
  $scope.distance = '2.5';
  $scope.loc = loc;  //loc should eventually be the geolocation stuff from above the angular module
  $scope.foodBucket; //this is where our search results will go if our api query is successful
  var bucket1 = $scope.foodBucket.slice(0,3);
  var bucket2 = $scope.foodBucket.slice(3,6);
  var bucket3 = $scope.foodBucket.slice(6);
  $scope.currentBucket = bucket1;
  $scope.changeBucket = function(){
    if($scope.currentBucket===bucket1) $scope.currentBucket = bucket2;
    if($scope.currentBucket===bucket2) $scope.currentBucket = bucket3;
    if($scope.currentBucket===bucket3) $scope.currentBucket = bucket1;
  };
  //This posts the food obj to the server and returns our data from Yelp api: 
  $scope.feedMe = function(){
  	// prepare obj to send to server:
  	var foodObj = {};
  	foodObj['search'] = $scope.search;
  	foodObj['stars'] = parseInt($scope.stars);
  	foodObj['distance'] = parseFloat($scope.distance);
  	foodObj['loc'] = $scope.loc;
  	console.log("I'm a food Object!", foodObj);
  	// send obj to server:
    Search.add(foodObj)  //post method in factory FIX THE PROMISES!!!
  	.then(function(results){
      console.log(results);
      $scope.foodBucket = results; //put food in bucket on success
  	  $state.go('searchResults'); //go to results display on success
    })
    .catch(function(err) {
      console.log('No food in my bucket :('); //cry yourself to sleep if failure
      //redirect to a searchWhoops page if this ever becomes not our fault all the time lol
    });
  };
  
  //This makes the star slider go:
  $scope.moStars = function(){ 
  	var num = parseInt($scope.stars) || 1;
  	console.log('NUMNUMNUM', num);
    return new Array(num);	
  }
  $scope.moStars();

})

.controller('AuthController', function(Auth, $scope){
  // objects to send to server, each contain username and password keys:
  $scope.user = {};
  $scope.newUser = {};
  $scope.sendSignup = function(){
  	console.log($scope.newUser);
  	Auth.signup($scope.newUser)
  	.then(function(results){
      console.log(results);
      //do I need to do something with a cookie or token here?
  	  $state.go('likes'); //redirect to likes page
    })
    .catch(function(err) {
      console.log('FAILED LOGIN'); //cry yourself to sleep if failure
      //redirect to a signupWhoops page if this ever becomes not our fault all the time lol
    });
  }
  $scope.sendLogin = function(){
  	console.log($scope.user);
  	Auth.login($scope.user)
  	.then(function(results){
      console.log(results);
      //do I need to do something with a cookie or token here?
  	  $state.go('likes'); //redirect to likes page
    })
    .catch(function(err) {
      console.log('FAILED LOGIN'); //cry yourself to sleep if failure
      //redirect to a loginWhoops page if this ever becomes not our fault all the time lol
    });
  	//User.add($scope.user);  post method in factory! FIX THE PROMISES!!!
  }
})