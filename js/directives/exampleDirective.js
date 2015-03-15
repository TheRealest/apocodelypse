module.exports = function($timeout) {
  return {
    scope: {
      setting: '='
    },
    templateUrl: '../partials/exampleDirective.html',
    restrict: 'E',
    link: function(scope) {
      scope.method = function() {
        // do stuff
      };
    }
  };
};
