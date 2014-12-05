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
