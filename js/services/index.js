angular
  .module('app')
  .service('commandRunner', require('./commandRunnerService'))
  .service('resources', require('./resourcesService'));

require('./commands');
