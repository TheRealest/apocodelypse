module.exports = require('./commandFactory')
  .createCommand('debugCommand',['resources','producers'])
  .add('debug', '`', function(flags, args) {
    if (args[0] === 'r') {
      var res = args[1], num = parseInt(args[2],0);
      if (!(res in this.resources.library)) return 'Resource (' + res + ') not found';
      if (num >= 0) {
        this.resources.add(res,num);
        return 'Added (' + num + ') to resource (' + res + ')';
      } else {
        this.resources.remove(res,-num);
        return 'Removed (' + -num + ') from resource (' + res + ')';
      }
    } else if (args[0] === 'p') {
      var prod = args[1], num = parseInt(args[2],0);
      if (!(prod in this.producers.library.producer)) return 'Producer (' + prod + ') not found';
      if (num >= 0) {
        this.producers.add(prod,num);
        return 'Added (' + num + ') to producer (' + prod + ')';
      } else {
        this.producers.remove(prod,-num);
        return 'Removed (' + -num + ') from producer (' + prod + ')';
      }
    } else if (args[0] === 'u') {
      var up = args[1], val = args[2];
      if (!(up in this.producers.library.upgrade)) return 'Upgrade (' + up + ') not found';
      var val = val === 'true' || val === '1' || angular.isUndefined(val) ? true : false;
      if (val) {
        this.producers.upgrade(up);
        return 'Added upgrade (' + up + ')';
      } else {
        this.producers.downgrade(up);
        return 'Removed upgrade (' + up + ')';
      }
    } else if (args[0] === 'test') {
      // run a test defined below
      return tests[args[1]] ? tests[args[1]].call(this.runner.runCommand,flags,args.slice(2)) : 'Test not found';
    } else {
      return this.runner.runCommand('debug --help');
    }
  })
  .help([
    'debug (alias: `) - manipulate data during development',
    '---',
    'USAGE:',
    '  debug',
    '        r <resource> <amount>',
    '        p <producer> <amount>',
    '        u <upgrade> [true|false]',
    '---',
    'MODES:',
    '  bare',
    '    Displays debug info.',
    '  r <resource> <amount>',
    '    Increments player resource quantity by amount given. Use a negative number to decrement the resource instead (won\'t reduce it below 0).',
    '  p <producer> <amount>',
    '    Increments player producer quantity by amount given. Use a negative number to decrement the producer instead (won\'t reduce it below 0).',
    '  u <upgrade> [true|false]',
    '    Adds or removes a producer upgrade. Default adds upgrade if second argument is omitted.'
    ],true)
  .command;

var tests = {
  log: function() {
    return [
      { content: ['left','right'], transforms: 'justify' },
      { content: 'header', transforms: 'header' },
      { content: 'indent-1', transforms: 'indent 1' }
    ];
  },
  r: function() {
    return [
      this('` r salt 5'),
      this('r')
    ];
  }
};
