'use strict';

angular.module('pokemonOrBigData.leaderBoard', ['ui.router'])

.controller('LeaderBoardCtrl', ['$scope', 'globalService', '$timeout', function($scope, globalService, $timeout) {

  var interval = 5000;

  $scope.pokemons = {
    total: 0,
    lines: []
  };

  $scope.bigdatas = {
    total: 0,
    lines: []
  };

  $scope.promises = {};

  var successPokemonCallback = function(response) {
    $scope.pokemons = response.data;

    $scope.promises.pokemon = $timeout( function() {
      globalService.leaderboard('Pokemon', successPokemonCallback, errorCallback);
    }, interval);
  }

  var successBigDataCallback = function(response) {
    $scope.bigdatas = response.data;
    $scope.promises.bigdata = $timeout( function() {
      globalService.leaderboard('BigData', successBigDataCallback, errorCallback);
    }, interval);

  }

  var errorCallback = function(error) {
    console.log('Error: ', error);
  }

  globalService.leaderboard('Pokemon', successPokemonCallback, errorCallback);
  globalService.leaderboard('BigData', successBigDataCallback, errorCallback);

  $scope.$on("$destroy", function() {
    if ($scope.promises.pokemon) {
      $timeout.cancel($scope.promises.pokemon);
    }

    if ($scope.promises.bigdata) {
      $timeout.cancel($scope.promises.bigdata);
    }
  });
}]);