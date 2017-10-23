'use strict';

angular.module('pokemonOrBigData', ['ui.router',
  'pokemonOrBigData.voting',
  'pokemonOrBigData.leaderBoard',
  'pokemonOrBigData.name-directive'
])
    .config(['$locationProvider', '$urlRouterProvider', '$stateProvider',
        function($locationProvider, $urlRouterProvider, $stateProvider) {

          $urlRouterProvider.otherwise('/voting');

            $stateProvider
              .state('voting', {
                url: '/voting',
                templateUrl: 'voting/voting.html',
                controller: 'VotingCtrl',
                params: {
                  next: false
                }
              })
              .state('next', {
                url: '/next',
                templateUrl: 'voting/voting.html',
                controller: 'VotingCtrl',
                params: {
                  next: true
                }
              })
              .state('leaderboard', {
                url: '/leaderboard',
                templateUrl: 'leaderboard/leaderboard.html',
                controller: 'LeaderBoardCtrl'
              });

           // $locationProvider.html5Mode(true);
    }])
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES', {
    all: '*',
    admin: 'admin'
});