'use strict';

angular.module('pokemonOrBigData.leaderBoard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/leaderboard', {
    templateUrl: 'leaderboard/leaderboard.html',
    controller: 'LeaderBoardCtrl'
  });
}])

.controller('LeaderBoardCtrl', ['$scope', 'globalService', '$timeout', function($scope, globalService, $timeout) {

  $scope.pokemons = {
    total: 0,
    lines: []
  };

  $scope.bigdatas = {
    total: 0,
    lines: []
  };

  var successPokemonCallback = function(response) {
    $scope.pokemons = response;
    $timeout( function() {
      globalService.leaderboard('Pokemon', successPokemonCallback, errorCallback);
    })
  }

  var successBigDataCallback = function(response) {
    $scope.pokemons = response;
    $timeout( function() {
      globalService.leaderboard('BigData', successBigDataCallback, errorCallback);
    })
  }

  var errorCallback = function(error) {
    console.log('Error: ', error);
  }

  globalService.leaderboard('Pokemon', successPokemonCallback, errorCallback);
  globalService.leaderboard('BigData', successBigDataCallback, errorCallback);
}]);