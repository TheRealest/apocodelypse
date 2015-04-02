module.exports = require('./commandFactory')
  .createCommand('helpCommand')
  .add('help', 'h', function(flags, args) {
    if (args.length === 0) {
      return this.formatOutput([
        'help [command]',
        '---',
        'Use this command to get information about usage, arguments, and flags for the given command.'
        ]);
    }
    var command = args[0] + ' --help ' + args.slice(1).join(' ');
    return this.runner.runCommand(command);
  })
  .command;
