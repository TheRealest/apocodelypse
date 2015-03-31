module.exports = function() {
  return {
    scope: {
        lang: '='
    },
    templateUrl: '../templates/codeWindowDirective.html',
    restrict: 'E',
    link: function(scope) {
      scope.method = function() {
        // do stuff
      };
    }
  };
};
