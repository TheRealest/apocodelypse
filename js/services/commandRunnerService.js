module.exports = ['commandLibrary', function(commandLibrary) {
  commandLibrary.init(this);

  this.runCommand = function(command) {
    var parsed = this.parseCommand(command);
    return commandLibrary.run(parsed.command, parsed.flags, parsed.args);
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
