module.exports = require('./commandFactory')
  .createCommand('producerCommand',['producers','LINE_WIDTH'])
  .add('producer', 'p', function(flags, args) {
    if (flags.length === 0 && args.length === 0) {
      var str = [
        'PRODUCERS',
        '---------'
      ];
      var ps = this.producers.all.producers();
      for (var p in ps) {
        var longName = this.producers.library.producer[p].longName;
        var amount = ps[p] + ' (' + this.producers.library.producer[p].rate + '/tick)';
        var spacesLength = this.LINE_WIDTH-longName.length-amount.length;
        var spaces = Array.apply(null,new Array(spacesLength)).map(function(){return ' ';}).join('');
        str.push(longName+spaces+amount);
      }
      return this.formatOutput(str,true);
    } else if (flags.contains('u')) {
      var str = [
        'UPGRADES',
        '--------'
      ];
      var us = this.producers.all.producers();
      for (var u in us) {
        var lib = this.producers.library.upgrade[u];
        var longName = lib.longName;
        var amount = lib.type + ' (x' + lib.rate + ')';
        var spacesLength = this.LINE_WIDTH-longName.length-amount.length;
        var spaces = Array.apply(null,new Array(spacesLength)).map(function(){return ' ';}).join('');
        str.push(longName+spaces+amount);
      }
      return this.formatOutput(str,true);
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
