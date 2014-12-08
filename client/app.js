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
  $urlRouterProvider.otherwise('/search');
  $stateProvider
    .state('search', {
      templateUrl:'search.html',
      controller: 'SearchController',
      url: '/search',
      
    })
    .state('likes', {
      templateUrl:'likes.html',
      controller: 'LikesController',
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
      controller: 'ResultsController',
      url: '/searchResults',
    })
    $urlRouterProvider.when('/','/search');
    
  })

//This controller is for our search ui-view and the searchResults ui-view:
.controller('SearchController', function(Search, Likes, $scope, $state){
  //This instantiates view so it looks pretty:
  $scope.stars = '3';
  $scope.distance = '2.5';
  $scope.loc = loc;  //loc should eventually be the geolocation stuff from above the angular module
  $scope.foodBucket; //this is where our search results will go if our api query is successful
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
  
.controller('ResultsController', function(Search, Likes, $scope, $state){
  $scope.foodBucket = Search.get();
  $scope.likes = Likes.likes;
  $scope.dislikes = Likes.dislikes;
  $scope.bucket1 = $scope.foodBucket.slice(0,3);
  $scope.bucket2 = $scope.foodBucket.slice(3,6);
  $scope.bucket3 = $scope.foodBucket.slice(6,9);
  $scope.currentBucket = $scope.bucket1;
  $scope.changeBucket = function(){
    if($scope.currentBucket===$scope.bucket1){
      $scope.currentBucket = $scope.bucket2;
      console.log('under bucket reassignment', $scope.currentBucket);
      $scope.$digest();
    }
    if($scope.currentBucket===$scope.bucket2){
      $scope.currentBucket = $scope.bucket3;
      $scope.$digest();
    }
    if($scope.currentBucket===$scope.bucket3){
      $scope.currentBucket = $scope.bucket1;
      $scope.$digest();
    }
    console.log('tryin to change');
  };

  $scope.tellUs = function(foodPlace, ind){
    console.log(foodPlace);
    console.log('$INDEX', ind);
    console.log('LIKES OBJ', $scope.likes);
    console.log('LIKES $INDEx value', $scope.likes[ind]);

    if($scope.likes[ind]){
      console.log('there it is')
      Likes.addLike(foodPlace)
      .then(function(){
        console.log('SUCCESS!!!');
      })
      .catch(function(err) {
        console.log('FAILED LIKING'); //cry yourself to sleep if failure
      })
      $scope.likes[ind] = false;
    }
    if($scope.dislikes[ind]){
      Likes.addDislike(foodPlace)
      .then(function(){
        console.log('SUCCESS!!!');
      })
      .catch(function(err) {
        console.log('FAILED DISLIKING'); //cry yourself to sleep if failure
      })
      $scope.dislikes[ind] = false;
    }
  }
})

.controller('LikesController', function(Likes, Search, $scope){
  $scope.likeBucket;
  $scope.likes = function(){
    Likes.getLikes()
    .then(function(results){
      console.log(results);
      $scope.likeBucket = results;
    })
    .catch(function(err) {
        console.log('FAILED LIKE GETTING'); //cry yourself to sleep if failure
    });
  }
  $scope.likes();
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