module.exports = function() {
  // init :: commandRunnerService -> commandService
  // called by the commandRunnerService to add a
  // reference to itself to this command
  this.init = function(runner) {
    this.runner = runner;
    return this;
  };

  // listCommands :: () -> [String]
  // returns list of recognized commands
  this.listCommands = function() {
    return Object.keys(this.commands);
  };

  // run :: String -> [String] -> [String] -> String
  // accepts all command params and returns output
  // to post to the console
  this.run = function(command, flags, args) {
    if (!(command in this.commands)) {
      var error = '';
      error += 'Command (';
      error += command;
      error += ') sent to wrong delegate (';
      error += this;
      error += ')';
      return error;
    }

    return this.commands[command](flags,args);
  };

  // commands :: {String : Function}
  // holds command functions which are called
  // when the command corresponding to their key
  // is called
  this.commands = {
    // command :: [String] -> [String] -> String
    // takes flags/args, performs command, and 
    // returns output string for console
  };
};
