'use strict';

angular.module('testApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.menu = [{
      'title': 'Home',
      'link': '/',
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    //Display dashboard if logged in
    $scope.isLoggedInAsync = Auth.isLoggedInAsync;
    $scope.isLoggedInAsync(function(loggedIn) {
      if(loggedIn) { $scope.menu = [{'title': 'Dashboard', 'link': '/dashboard'}]; }
    });

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });