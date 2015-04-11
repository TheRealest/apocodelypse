module.exports = [
  'echoCommand',
  'helpCommand',
  'debugCommand',
  'resourceCommand',
  'producerCommand',
  function(echoCommand, helpCommand, debugCommand, resourceCommand, producerCommand) {
    var commandDelegates = [
      echoCommand,
      helpCommand,
      debugCommand,
      resourceCommand,
      producerCommand
    ];

    var commands = {},
        aliases = {};
    commandDelegates.forEach(function(delegate) {
      delegate.listCommands().forEach(function(command) {
        if (command in commands) {
          var error = '';
          error += 'Command name conflict: [';
          error += command;
          error += '] defined in ';
          error += commands[command].name;
          error += ' / ';
          error += delegate.name;
          console.log(error);
        } else {
          commands[command] = delegate;
        }
      });
      delegate.listAliases().forEach(function(alias) {
        if (alias in aliases) {
          var error = '';
          error += 'Alias name conflict: [';
          error += alias;
          error += '] defined as [';
          error += commands[aliases[alias]].name;
          error += '.';
          error += aliases[alias];
          error += '] / [';
          error += delegate.name;
          error += '.';
          error += delegate.aliases[alias];
          error += ']';
          console.log(error);
        } else {
          aliases[alias] = delegate.aliases[alias];
        }
      });
    });

    // for development
    console.log('Known commands: ' + Object.keys(commands).join(', '));
    console.log(Object.keys(aliases).reduce(function(str,a,i) {
      str += a + ' (' + aliases[a] + ')';
      return i + 1 !== Object.keys(aliases).length ? str + ', ' : str;
    },'Known aliases: '));

    this.init = function(runner) {
      commandDelegates = commandDelegates.map(function(d) {
        return d.init(runner);
      });
      
      return this;
    };

    this.hasCommand = function(keyword) {
      return keyword in commands;
    };

    this.hasAlias = function(keyword) {
      return keyword in aliases && aliases[keyword] in commands;
    };

    this.run = function(cmd, flags, args) {
      if (this.hasCommand(cmd)) {
        return commands[cmd].run(cmd, flags, args);
      } else if (this.hasAlias(cmd)) {
        return commands[aliases[cmd]].run(aliases[cmd], flags, args);
      } else {
        return 'Command [' + cmd + '] not recognized';
      }
    };
  }
];
