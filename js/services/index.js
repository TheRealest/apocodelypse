angular
  .module('app')
  .service('commandRunner', require('./commandRunnerService'))
  .service('resources', require('./resourcesService'))
  .service('producers', require('./producersService'));

require('./commands');
