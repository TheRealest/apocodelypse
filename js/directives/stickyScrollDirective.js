module.exports = function() {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attr) {
      var el = element[0];
      var sticky = true;

      function isScrolledToBottom() {
        return el.scrollTop + el.clientHeight >= el.scrollHeight;
      }

      function scrollHandler() {
        if (sticky) {
          el.scrollTop = el.scrollHeight - el.clientHeight;
        }
      }

      scope.$watch(scrollHandler);
      element.bind('scroll', function() {
        sticky = isScrolledToBottom();
      });
    }
  };
};
