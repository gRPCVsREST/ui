'use strict';

angular.module('pokemonOrBigData.name-directive', [])

.directive('nameGenerator', ['globalService', function(globalService) {

  return function(scope, elm) {
    elm.text(globalService.getName());
  };
}]);