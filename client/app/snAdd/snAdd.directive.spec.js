'use strict';

describe('Directive: snAdd', function () {

  // load the directive's module and view
  beforeEach(module('testApp'));
  beforeEach(module('app/snAdd/snAdd.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sn-add></sn-add>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the snAdd directive');
  }));
});