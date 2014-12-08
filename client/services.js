// services.js

angular.module('EAT.services', [])

//method used in app.js 'SeachController'
.factory('Search', function ($http) {
  // Your code here
  var biznasses;
  var add = function(foodObj) {
    console.log('this is a food obj',foodObj)
    return $http({
      method: 'POST',
      url: '/imhungry',
      data: foodObj
    })
    .then(function(resp){
      console.log('RESPONDING', resp);
      biznasses = resp.data.businesses;
    })
    .catch(function(err){
      console.log(err, 'CAUGHTCAUGHT!');
    });
  }
  var get = function() {
    return biznasses;
  }
  return {
    add: add,
    get: get
  };
})

//add methods used in app.js 'SearchController', gets used in 'LikesController'
.factory('Likes', function ($http) {
  // Your code here
  var likes = {};
  var dislikes = {};
  var addLike = function(likesObj) {
    console.log('this is a likesObj',likesObj)
    return $http({
      method: 'POST',
      url: '/likes',
      data: likesObj
    })
    .then(function(resp){
      console.log('RESPONDING', resp);
    })
    .catch(function(err){
      console.log(err, 'no like posted!');
    });
  };
  var getLikes = function() {
    return $http({
      method: 'GET',
      url: '/likes'
    })
    .then(function(resp){
      console.log('RESPONDING', resp);
      return resp.data
    })
    .catch(function(err){
      console.log(err, 'no incoming likes');
    });
  };
  var addDislike = function(likesObj) {
    console.log('this is a dislikesObj',likesObj)
    return $http({
      method: 'POST',
      url: '/dislikes',
      data: likesObj
    })
    .then(function(resp){
      console.log('RESPONDING', resp);
    })
    .catch(function(err){
      console.log(err, 'no like posted!');
    });
  };
  var getDislikes = function() {
    return $http({
      method: 'GET',
      url: '/dislikes'
    })
    .then(function(resp){
      console.log('RESPONDING', resp);
      return resp.data
    })
    .catch(function(err){
      console.log(err, 'no incoming likes');
    });
  };
  return {
    addLike: addLike,
    getLikes: getLikes,
    addDislike: addDislike,
    getDislike: getDislikes,
    likes: likes,
    dislikes: dislikes
  };
})

//method used in app.js 'AuthController'
.factory('Auth', function ($http, $location, $window) {

  var login = function(userObj) {
    console.log('this is a userobj',userObj)
    return $http({
      method: 'POST',
      url: '/login',
      data: userObj
    })
    .then(function(resp){
      console.log('RESPONDING', resp);
      return resp.data.token;
    })
    .catch(function(err){
      console.log(err, 'CAUGHTCAUGHT!');
    });
  };

  var signup = function(userObj) {
    console.log('this is a userobj',userObj)
    return $http({
      method: 'POST',
      url: '/signup',
      data: userObj
    })
    .then(function(resp){
      console.log('RESPONDING', resp);
      return resp.data.token;
    })
    .catch(function(err){
      console.log(err, 'CAUGHTCAUGHT!');
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.eat');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.eat');
    $location.path('/login');
  };

  return {
    login: login,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})
