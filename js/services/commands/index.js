angular
  .module('app')
  .service('commandLibrary', require('./commandLibraryService'))
  .service('echoCommand', require('./echoCommandService'))
  .service('helpCommand', require('./helpCommandService'))
  .service('resourceCommand', require('./resourceCommandService'));
