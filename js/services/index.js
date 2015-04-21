angular
  .module('app')
  .service('commandRunner', require('./commandRunnerService'))
  .service('log', require('./logService'))
  .service('resources', require('./resourcesService'))
  .service('producers', require('./producersService'));

require('./commands');
