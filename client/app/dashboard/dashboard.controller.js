'use strict';

angular.module('testApp')
  .controller('DashboardCtrl', function ($scope, $http, $routeParams, $location, Auth) {

    $scope.polls = [];
    $scope.newPoll = {
        name: '',
        name_id: '',
		question: '',
		options: [['', 0], ['', 0]],
        create_at: ''
    };

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    var name = $scope.getCurrentUser().name;
    var name_id = $scope.getCurrentUser()._id;

    // Sync $scope with database; get polls created by current user
    $http.get('/api/polls/' + name + '/' + name_id).success(function(polls) {
        $scope.polls = polls;
    })

    // Do stuff when user clicks submit button
    $scope.create = function(form) {
        $scope.submitted = true;
        if (form.$valid) $scope.populate();
    };

    // Populate newPoll; push to $scope.polls
    $scope.populate = function() {
        $scope.newPoll.options = [];
        var options = document.getElementsByClassName('form-option');

        // Push valid options to $scope.newPoll
    	for (var i = 0; i < options.length; i++) {
            if (options[i].value.split(' ').join('').length > 0) {
                $scope.newPoll.options.push([options[i].value, 0]);
            }
    		options[i].value = '';
    	}
        $scope.newPoll.create_at = Date.now();
        $scope.newPoll.name = $scope.getCurrentUser().name;
        $scope.newPoll.name_id = $scope.getCurrentUser()._id;
    	$scope.polls.push($scope.newPoll);

        // Add ID to current poll
        $http.post('/api/polls', $scope.newPoll).success(function(pollWithId) {
            $scope.polls.pop()
            $scope.polls.push(pollWithId);
            // Redirect to poll page
            $location.path('/poll/' + pollWithId._id);
        });

        // Reset form
    	$scope.newPoll = {question:'', options:[]};
        $scope.submitted = false;
    };

    $scope.delete = function(poll) {
        $http.delete('/api/polls/' + poll._id);
        angular.forEach($scope.polls, function(p, index) {
            if (p === poll) { $scope.polls.splice(index, 1) };
        });
    };

  });