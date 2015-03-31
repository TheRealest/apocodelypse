angular
  .module('app')
  .directive('autoFocus', require('./autoFocusDirective'))
  .directive('codeWindow', require('./codeWindowDirective'))
  .directive('console', require('./consoleDirective'));
