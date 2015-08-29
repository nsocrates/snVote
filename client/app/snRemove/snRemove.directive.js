'use strict';

angular.module('testApp')
  .directive('snRemove', function() {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.bind('click', function() {
        	$(this).parent().remove();
        });
      }
    };
  });