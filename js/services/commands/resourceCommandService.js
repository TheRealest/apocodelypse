module.exports = require('./commandFactory')
  .createCommand('resourceCommand',['resources','LINE_WIDTH'])
  .add('resource', 'r', function(flags, args) {
    if (flags.length === 0 && args.length === 0) {
      var str = [
        'RESOURCES',
        '---------'
      ];
      var rs = this.resources.all();
      for (var r in rs) {
        var longName = this.resources.library[r].longName;
        var amount = rs[r] + ' ' + this.resources.library[r].unit;
        var spacesLength = this.LINE_WIDTH-longName.length-amount.length;
        var spaces = Array.apply(null,new Array(spacesLength)).map(function(){return ' ';}).join('');
        str.push(longName+spaces+amount);
      }
      return this.formatOutput(str,true);
    } else {
      return this.runner.runCommand('resource --help');
    }
  })
  .help([
    'resource (alias: r) - display resource information',
    '---',
    'USAGE:',
    '  resource',
    '           -g',
    '           -f <family>',
    '           -a [-g] [-f <family>]',
    '           -d <resource>',
    '---',
    'MODES:',
    '  bare',
    '    Displays all resources with quantities in alphabetical order.',
    '  -g',
    '    Groups output by resource group (i.e. plant extract, medicine, alloy, etc).'
    ],true)
  .command;
