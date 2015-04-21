module.exports = require('./commandFactory')
  .createCommand('resourceCommand',['resources','LINE_WIDTH'])
  .add('resource', 'r', function(flags, args) {
    if (flags.length === 0 && args.length === 0) {
      var lines = [this.line('resources','header')];
      var rs = this.resources.all();
      if (Object.keys(rs).length === 0) return 'No resources yet!';

      for (var r in rs) {
        var longName = this.resources.library[r].longName;
        var amount = rs[r] + ' ' + this.resources.library[r].unit;
        lines.push(this.line([longName,amount],'justify'));
      }

      return lines;
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
