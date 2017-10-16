'use strict';

angular.module('pokemonOrBigData.voting', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/voting', {
    templateUrl: 'voting/voting.html',
    controller: 'VotingCtrl',
    $scope: {
      next: false
    }
  })
}])

.controller('VotingCtrl', ['$scope', 'globalService', function($scope, globalService) {

  console.log($scope);
  $scope.question = {
    id: 0,
    content: '',
    category: ''
  };

  var successCallback = function(response) {
    $scope.question.id = response.id;
    $scope.question.content = response.content;
    $scope.question.category = response.category;
  }

  var errorCallback = function(error) {
    console.log('Error: ', error);
  }

  var vote = function(category) {
    globalService.vote(category, $scope.question.id);
    globalService.feed( successCallback, errorCallback );
  }

  globalService.feed( successCallback, errorCallback );

  $scope.onNextClick = function($event) {
    vote('Pokemon');
  };

  $scope.onPokemonClick = function($event) {
    vote('Pokemon');
  };

  $scope.onBigDataClick = function($event) {
    vote('Big Data');
  };

}]);