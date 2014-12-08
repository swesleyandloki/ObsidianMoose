// services.js

angular.module('EAT.services', [])

//method used in app.js 'SeachController'
.factory('Search', function ($http) {
  // Your code here
  var add = function(foodObj) {
    console.log('this is a food obj',foodObj)
    return $http({
      method: 'POST',
      url: '/imhungry',
      data: foodObj
    })
    .then(function(resp){
      console.log('RESPONDING', resp);
      return resp.data
    })
    .catch(function(err){
      console.log(err, 'CAUGHTCAUGHT!');
    });
  };
  return {
    add: add
  };
})

//add methods used in app.js 'SearchController', gets used in 'LikesController'
.factory('Likes', function ($http) {
  // Your code here
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
    console.log('this is a likesObj',likesObj)
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
    getDislike: getDislikes
  };
})

//method used in app.js 'AuthController'
.factory('Auth', function ($http) {
  // Your code here
  var login = function(userObj) {
    console.log('this is a userobj',userObj)
    return $http({
      method: 'POST',
      url: '/login',
      data: userObj
    })
    .then(function(resp){
      console.log('RESPONDING', resp);
      return resp.data
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
      return resp.data
    })
    .catch(function(err){
      console.log(err, 'CAUGHTCAUGHT!');
    });
  };
  return {
    login: login,
    signup: signup
  };
})
