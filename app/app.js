'use strict';

angular.module('pokemonOrBigData', [
  'ngRoute',
  'pokemonOrBigData.voting',
  'pokemonOrBigData.leaderBoard',
  'pokemonOrBigData.name-directive'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/voting'});
}]);