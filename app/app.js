define(['service/service',
        'leaderboard/leaderboard',
        'voting/voting',
        'components/nameGenerator'],

    function (globalService, leaderBoardController, votingController, nameGenerator) {
        var app = angular.module('pokemonOrBigData', ['ui.router']);

        app.service('globalService', globalService)
        app.controller('leaderBoardController', leaderBoardController);
        app.controller('votingController', votingController);
        app.directive('nameGenerator', nameGenerator);

        app.config(['$locationProvider', '$urlRouterProvider', '$stateProvider',
            function ($locationProvider, $urlRouterProvider, $stateProvider) {

                $urlRouterProvider.otherwise('/voting');

                $stateProvider
                    .state('voting', {
                        url: '/voting',
                        templateUrl: 'voting/voting.html',
                        controller: 'votingController',
                        params: {
                            next: false
                        }
                    })
                    .state('next', {
                        url: '/next',
                        templateUrl: 'voting/voting.html',
                        controller: 'votingController',
                        params: {
                            next: true
                        }
                    })
                    .state('leaderboard', {
                        url: '/leaderboard',
                        templateUrl: 'leaderboard/leaderboard.html',
                        controller: 'leaderBoardController'
                    });

            }]);
    });