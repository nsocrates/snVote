'use strict';

angular.module('testApp')
  .directive('snRemove', function() {
    return {
      restrict: 'EA',
      link: function (scope, element) {
        element.bind('click', function() {
        	$(this).parent().remove();
        });
      }
    };
  });