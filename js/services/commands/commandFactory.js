module.exports = {
  createCommand: function(name, dependencies) {
    dependencies = dependencies || [];
    this.command = Function.apply(Function,dependencies.concat(
      [dependencies.reduce(function(str,s,i) {
        return str + 'this.'+s+' = arguments['+i+'];';
      },'')]
    ));
    this.command.$inject = dependencies;
    this.command.prototype = this.getCommandPrototype();
    this.command.prototype.name = name;
    return this;
  },

  add: function(cmd, aliases, processor) {
    if (arguments.length === 2) {
      processor = aliases;
      aliases = [];
    }
    if (!Array.isArray(aliases)) aliases = [aliases];

    this.command.prototype.commands[cmd] = processor;
    aliases.forEach(function(a) {
      this.command.prototype.aliases[a] = cmd;
    }.bind(this));

    this.last = cmd;
    return this;
  },

  getLast: function() {
    return this.command.prototype.commands[this.last];
  },

  setLast: function(func) {
    this.command.prototype.commands[this.last] = func;
  },

  helpDecorator: function(str, cmd) {
    return function(flags, args) {
      if (flags.contains('help')) return str;
      return cmd.call(this,flags,args);
    };
  },

  // takes the same arguments as formatOutput
  help: function(lines, escape) {
    var str = this.getCommandPrototype().formatOutput(lines,escape);
    this.setLast(this.helpDecorator(str,this.getLast()));
    return this;
  },

  getCommandPrototype: function() {
    return {
      init: function(runner) {
        this.runner = runner;
        return this;
      },

      listCommands: function() {
        return Object.keys(this.commands);
      },

      listAliases: function() {
        return Object.keys(this.aliases);
      },

      run: function(command, flags, args) {
        if (!(command in this.commands)) {
          var error = '';
          error += 'Command [';
          error += command;
          error += '] sent to wrong delegate ';
          error += this;
          return error;
        }
        return this.commands[command].call(this,flags,args);
      },

      commands: {},
      aliases: {},

      // call formatOutput with an array of strings or list
      // of strings to be combined with HTML line breaks
      // (<br>) -- if used in the array mode, pass true into
      // the second argument to escape the lines before
      // concatenating and preserve spaces in output
      formatOutput: function(lines, escape) {
        if (Array.isArray(lines) && escape) {
          lines = lines.map(function(line) {
            return line.escapeHTML().spaceHTML();
          });
        } else if (!Array.isArray(lines)) {
          lines = [].slice.call(arguments);
        }
        return lines.join('<br>');
      },

      // generate a nice looking output table
      formatData: function(data) {

      },

      // generate a string with n spaces
      spaces: function(n) {
        var ss = Array.apply(null,new Array(n));
        return ss.map(function(){return ' ';}).join('')
      }
    };
  }
};
