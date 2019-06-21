'use strict';
var mainApp = angular.module("mainApp", []);
//display existing tags

mainApp.controller('bookmarkController', function($scope, $http, $location) {
   var tag = $location.search().name;
   if(typeof tag != 'undefined' && tag != '' && tag != null ){
      tag = encodeURIComponent(tag);
      $scope.bookmarks = [];
   //only get the recently modified 50 bookmakrs
      let user = JSON.parse(localStorage.getItem('user'));
      let token = '';
      if (user && user.token) {
        token = user.token;
      }
      $http.get('/api/link/search?tag='+tag,
      {
         headers: {'Authorization': 'Bearer ' + token }
      }
      ).then(function (result) {
         $scope.bookmarks =result.data;
      });
   }
   
});

