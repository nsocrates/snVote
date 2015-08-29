'use strict';

angular.module('testApp')
  .controller('AllPollsCtrl', function ($scope, $http, Auth) {
  	$scope.isAdmin = Auth.isAdmin;
  	
    $http.get('/api/polls').success(function(polls) {
        $scope.polls = polls;
    });

    $scope.delete = function(poll) {
        $http.delete('/api/polls/' + poll._id);
        angular.forEach($scope.polls, function(p, index) {
            if (p === poll) { $scope.polls.splice(index, 1); }
        });
    };
  });