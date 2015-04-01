require('ionic-angular');

var app = angular.module('app', [
  'ionic',
  'ui.router'
  ])
  .config(function($stateProvider) {
    $stateProvider
      .state('code', {
        url: '/code',
        templateUrl: 'views/code.html'
      });
  })
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/code');
  });

require('./utils');

require('./controllers');
require('./directives');
require('./services');
