'use strict';

angular.module('testApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/all-polls', {
        templateUrl: 'app/all-polls/all-polls.html',
        controller: 'AllPollsCtrl'
      });
  });
