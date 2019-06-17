'use strict';
var mainApp = angular.module("mainApp", []);
 

//display existing tags
mainApp.controller('bookmarkController', function($scope, $http) {
   var tag = $location.search().tag;
   
   alert("tag = "+ tag);
   $scope.bookmarks = [];
   //only get the recently modified 50 bookmakrs
   $http.get('/api/link?search?tag='+tag).then(function (result) {
      $scope.bookmarks =result.data;
   });
   
});

