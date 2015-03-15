require('angular');

var app = angular.module('app', [
  'ionic'
  ])
  .config(function($stateProvider) {
    // $stateProvider
    //   .state('STATENAME' {
    //     url: '/state_name',
    //     templateUrl: 'views/state_name.html'
    //   });
  })
  .config(function($urlRouterProvider) {
    // $urlRouterProvider.otherwise('/');
  })

require('./controllers');
require('./directives');
require('./services');
