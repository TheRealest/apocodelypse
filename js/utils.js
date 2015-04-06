Array.prototype.contains = function(elem) {
  return this.indexOf(elem) !== -1;
};

String.prototype.escapeHTML = function() {
  var elem = document.createElement('div');
  elem.appendChild(document.createTextNode(this));
  return elem.innerHTML;
};

String.prototype.spaceHTML = function() {
  return this.replace(/\s/g,'&nbsp;');
};

if (!Object.merge) {
  Object.defineProperty(Object.prototype, 'merge', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(obj) {
      if (!obj) return this;
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          this[prop] = obj[prop];
        }
      }
      if (arguments.length > 1) {
        this.merge.apply(this,[].slice.call(arguments,1));
      }

      return this;
    }
  });
}
