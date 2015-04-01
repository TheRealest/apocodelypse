module.exports = require('./commandFactory')
  .createCommand('resourceCommand')
  .add('resource', 'r', function(flags, args) {
    return 'resource command ran';
  })
  .command;
