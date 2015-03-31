module.exports = function() {
  require('./commandPrototype').call(this);

  this.commands.help = function(flags, args) {
    if (args.length === 0) {
      return 'Usage: help <command>';
    }
    var command = args[0] + ' --help';
    return this.runner.runCommand(command);
  }.bind(this);
};
