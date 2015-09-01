'use strict';

angular.module('testApp')
  .directive('snAdd', function () {
    return {
      restrict: 'EA',
      link: function (scope, element) {
      	element.bind('click', function() {
      		var el = angular.element(document.getElementById('optionAnchor'));
      		var form = '<div class="form-group">'+
                        	'<input type="text" name="option" class="form-control form-poll form-option" placeholder="Enter option" required/>'+
                        	'<a href="#"><i class="fa fa-times-circle fa-lg"></i></a>'+
                     	'</div>';
          el.append(form);
      		$('.fa-times-circle').on('click', function() {
      			$(this).closest('.form-group').remove();
      		});
      	});
      }
    };
  });