module.exports = require('./commandFactory')
  .createCommand('echoCommand')
  .add('echo', function(flags, args) {
    var command = {};
    command.command = args[0];
    command.flags = flags;
    command.args = args.slice(1);

    return JSON.stringify(command);
  })
  .help(['echo [command]',
        '---',
        'Outputs the parsed version of the given command (identifies command, flags, and args).'])
  .command;
