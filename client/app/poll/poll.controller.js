'use strict';

angular.module('testApp')
  .controller('PollCtrl', function ($scope, $http, $routeParams) {

  	var id = $routeParams.id;
  	var index = 0;

    $http.get('/api/polls/' + id).success(function(polls) {
        $scope.polls = polls;
    });

    $scope.getTotal = function() {
    	var total = 0;
    	for (var i = 0; i < $scope.polls.options.length; i++) {
    		total += $scope.polls.options[i][1];
    	}
    	return total;
    };

    $scope.select = function(i) {
    	index = i;
    }

    $scope.vote = function() {
    	$scope.polls.options[index][1] += 1;
    	$http.put('/api/polls/' + id, $scope.polls);
    };

    $scope.showResults = function() {

		// Load the Visualization API and the piechart package.
		google.load('visualization', '1.0', {
			packages: ['corechart'],
			callback: drawChart
		});

		// Callback that creates and populates a data table,
		// instantiates the pie chart, passes in the data and
		// draws it.
		function drawChart() {

		// Create the data table.
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Options');
		data.addColumn('number', 'Votes');
		data.addRows($scope.polls.options);

		// Set chart options
		var options = {
			//colors: ['#e94047', '#eb575d', '#EE6E73', '#f18589', '#f39c9f'],
			colors: ['#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#4CAF50'],
			fontName: 'Roboto',
			fontSize: 14,
			chartArea: {width: '90%', height: '90%'},
			legend: {alignment: 'center'},
			width: 400,
			height: 300,
			sliceVisibilityThreshold: 0
		};

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
		chart.draw(data, options);
		}

    }

  });