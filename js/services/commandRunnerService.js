module.exports = ['helpCommand', function(helpCommand) {
  var commandDelegates = [
    helpCommand.init(this)
  ];

  this.commands = {};
  commandDelegates.forEach(function(delegate) {
    delegate.listCommands().forEach(function(command) {
      if (command in this.commands) {
        var error = '';
        error += 'Command name conflict: ';
        error += command;
        error += ' defined in ';
        error += this.commands[command];
        error += ' / ';
        error += delegate;
        console.log(error);
      } else {
        this.commands[command] = delegate;
      }
    }.bind(this));
  }.bind(this));

  this.hasCommand = function(keyword) {
    return keyword in this.commands;
  };

  this.aliases = {
    h: 'help'
  };

  this.hasAlias = function(keyword) {
    return keyword in this.aliases && this.aliases[keyword] in this.commands;
  };

  this.runCommand = function(command) {
    var parsed = this.parseCommand(command);
    if (this.hasCommand(parsed.command)) {
      return this.commands[parsed.command].run(parsed.command, parsed.flags, parsed.args);
    } else if (this.hasAlias(parsed.command)) {
      return this.commands[this.aliases[parsed.command]].run(this.aliases[parsed.command], parsed.flags, parsed.args);
    } else {
      return 'Command not recognized: ' + parsed.command;
    }
  };

  this.parseCommand = function(command) {
    var tokens = command.split(' ');
    if (tokens.length === 0) return undefined;

    var parsed = {
      command: tokens.shift(),
      flags: [],
      args: []
    };
    while (tokens.length) {
      var t = tokens.shift();
      if (t[0] === '-') { // flag
        if (t[1] === '-') { // long flag
          t = t.slice(2);
          parsed.flags.push(t);
        } else { // short flag(s)
          t = t.slice(1);
          t.split('').forEach(function(f) { parsed.flags.push(f); });
        }
      } else { // arg
        parsed.args.push(t);
      }
    }
    // remove duplicate flags
    parsed.flags = parsed.flags.filter(function(f,i,fs) {
      return fs.indexOf(f) === i;
    });
    return parsed;
  };
}];
