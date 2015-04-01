module.exports = require('./commandFactory')
  .createCommand('echoCommand')
  .add('echo', function(flags, args) {
    var command = {};
    command.command = args[0];
    command.flags = flags;
    command.args = args.slice(1);

    return JSON.stringify(command);
  })
  .command;
