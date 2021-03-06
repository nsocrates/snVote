'use strict';

angular.module('testApp')
  .controller('PollCtrl', function ($scope, $http, $routeParams) {

  	var id = $routeParams.id;
  	var index = 0;
  	$scope.total = 0;

    $http.get('/api/polls/' + id).success(function(polls) {
        $scope.polls = polls;
    });

    $scope.getTotal = function() {
    	for (var i = 0; i < $scope.polls.options.length; i++) {
    		$scope.total += $scope.polls.options[i][1];
    	}
    };

    $scope.select = function(i) {
    	index = i;
    };

    $scope.vote = function() {
    	$scope.polls.options[index][1] += 1;
    	$scope.total += 1;
    	$http.put('/api/polls/' + id, $scope.polls);
    };

    $scope.showResults = function() {
    	$scope.getTotal();

		// Load the Visualization API and the piechart package.
		google.load('visualization', '1.0', {
			packages: ['corechart'],
			callback: drawChart
		});

		// Callback that creates and populates a data table,
		// instantiates the pie chart, passes in the data and
		// draws it.
		$(window).resize(function(){
    		drawChart();
		});
		function drawChart() {

		// Create the data table.
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Options');
		data.addColumn('number', 'Votes');
		data.addRows($scope.polls.options);

		// Set chart options
		var options = {
			colors: ['#F06292', '#BA68C8', '#7986CB', '#9575CD', '#E57373'],
			fontName: 'Roboto',
			fontSize: 14,
			legend: {alignment: 'center'},
			width: '100%',
			height: '100%',
			sliceVisibilityThreshold: 0,
			chartArea: {
				left: '3%',
				top: '3%',
				height: '94%',
				width: '94%'
			}
		};

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
		chart.draw(data, options);
		}

    };

  });