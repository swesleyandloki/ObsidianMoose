// services.js

angular.module('EAT.services', [])

.factory('Search', function ($http) {
  // Your code here
  var get = function() {
    return $http({
      method: 'GET',
      url: '/imhungry'
    })
    .then(function(resp){
      console.log('RESPONDING',resp);
      return resp.data;
    });
  };
  var add = function(foodObj) {
    console.log('this is a food obj',foodObj)
    return $http({
      method: 'POST',
      url: '/imhungry',
      data: foodObj
    })
    .then(function(){
      console.log('HeyThere!');
    })
    .catch(function(err){
      console.log(err, 'CAUGHTCAUGHT!');
    });
  };
  return {
    get: get,
    add: add
  };
})
