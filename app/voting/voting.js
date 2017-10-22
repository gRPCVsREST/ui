'use strict';

angular.module('pokemonOrBigData.voting', ['ui.router'])

.controller('VotingCtrl', ['$scope', 'globalService', '$stateParams', function($scope, globalService, $stateParams) {
  $scope.next = $stateParams.next;

  $scope.clicked = false;

  $scope.question = {
    id: 0,
    content: '',
    category: ''
  };

  var successCallback = function(response) {
    $scope.question.id = response.id;
    $scope.question.content = response.content;
    $scope.question.category = response.category;
    $scope.clicked = false;
  }

  var errorCallback = function(error) {
    console.log('Error: ', error);
    console.log('Getting next item');
    $scope.clicked = false;
    globalService.feed( successCallback, errorCallback );
  }

  var vote = function(category) {
    globalService.vote(category, $scope.question.id);
    globalService.feed( successCallback, errorCallback );
  }

  globalService.feed( successCallback, errorCallback );

  $scope.onNextClick = function($event) {
    if (!$scope.clicked) {
      $scope.clicked = true;
      globalService.feed(successCallback, errorCallback);
    }
  };

  $scope.onPokemonClick = function($event) {
    if (!$scope.clicked) {
      $scope.clicked = true;
      vote('ZRADA');
    }
  };

  $scope.onBigDataClick = function($event) {
    if (!$scope.clicked) {
      $scope.clicked = true;
      vote('PEREMOGA');
    }
  };

}]);
