Array.prototype.contains = function(elem) {
  return this.indexOf(elem) !== -1;
};

// Object.prototype.merge = function(obj) {
//   if (!obj) return this;
//   for (var prop in obj) {
//     if (obj.hasOwnProperty(prop)) {
//       this[prop] = obj[prop];
//     }
//   }
//   if (arguments.length > 1) {
//     this.merge.apply(this,[].slice.call(arguments,1));
//   }

//   return this;
// };
