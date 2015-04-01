angular
  .module('app')
  .service('commandRunner', require('./commandRunnerService'));

require('./commands');
