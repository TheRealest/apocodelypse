module.exports = require('./commandFactory')
  .createCommand('debugCommand',['resources'])
  .add('debug', '`', function(flags, args) {
    if (args[0] === 'res') {
      var res = args[1], num = parseInt(args[2],0);
      if (num >= 0) {
        this.resources.add(res,num);
        return 'Added (' + num + ') to resource (' + res + ')';
      } else {
        this.resources.remove(res,-num);
        return 'Removed (' + -num + ') from resource (' + res + ')';
      }
    } else {
      return false;
    }
  })
  .help([
    'debug (alias: !) - manipulate',
    '---',
    'USAGE:',
    '  debug',
    '        res <resource> <amount>',
    '---',
    'MODES:',
    '  bare',
    '    Displays debug info.',
    '  res <resource> <amount>',
    '    Increments player resource quantity by amount given. Use a negative number to decrement the resource instead (won\'t reduce it below 0).'
    ],true)
  .command;
