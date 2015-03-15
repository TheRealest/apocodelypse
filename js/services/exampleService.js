module.exports = function($timeout) {
  this.method = function() {
    $timeout(function() {
      // do stuff
    });
  };
};
