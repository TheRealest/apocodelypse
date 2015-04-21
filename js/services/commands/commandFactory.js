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

  // takes the same arguments as log.process
  help: function(lines) {
    this.setLast(this.helpDecorator(lines,this.getLast()));
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

      line: function(content,transforms) {
        transforms = Array.isArray(transforms) ? transforms : [transforms];
        return {
          content: content,
          transforms: transforms
        };
      },

      // generate a string with n spaces
      spaces: function(n) {
        var ss = Array.apply(null,new Array(n));
        return ss.map(function(){return ' ';}).join('')
      }
    };
  }
};
