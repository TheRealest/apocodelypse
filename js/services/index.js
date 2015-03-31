angular
  .module('app')
  .service('commandRunner', require('./commandRunnerService'))
  .service('helpCommand', require('./helpCommandService'));
