angular
  .module('app')
  .directive('autoFocus', require('./autoFocusDirective'))
  .directive('stickyScroll', require('./stickyScrollDirective'))
  .directive('codeWindow', require('./codeWindowDirective'))
  .directive('console', require('./consoleDirective'));
