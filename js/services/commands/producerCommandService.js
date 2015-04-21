module.exports = require('./commandFactory')
  .createCommand('producerCommand',['producers','LINE_WIDTH'])
  .add('producer', 'p', function(flags, args) {
    if (flags.length === 0 && args.length === 0) {
      var lines = [this.line('producers','header')];
      var ps = this.producers.all.producers();
      if (Object.keys(ps).length === 0) return 'No producers yet!';

      for (var p in ps) {
        var longName = this.producers.library.producer[p].longName;
        var amount = ps[p] + ' (' + this.producers.library.producer[p].rate + '/tick)';
        lines.push(this.line([longName,amount],'justify'));
      }
      return lines;
    } else if (flags.contains('u')) {
      var lines = [this.line('upgrades','header')];
      var us = this.producers.all.upgrades();
      if (Object.keys(us).length === 0) return 'No upgrades yet!';

      for (var u in us) {
        var up = this.producers.library.upgrade[u];
        var longName = up.longName;
        var amount = up.type + ' (x' + up.rate + ')';
        lines.push([longName,amount],'justify');
      }
      return lines;
    } else {
      return this.runner.runCommand('producer --help');
    }
  })
  .help([
    'producer (alias: p) - display producer information',
    '---',
    'USAGE:',
    '  producer',
    '---',
    'MODES:',
    '  bare',
    '    Displays all producers with quantities and production rates in alphabetical order.',
    '  -u',
    '    Displays producer upgrades.'
    ],true)
  .command;
