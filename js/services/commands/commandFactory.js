module.exports = {
  createCommand: function(name) {
    this.command = function() {};
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
      aliases: {}
    };
  }
};
