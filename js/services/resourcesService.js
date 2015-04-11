module.exports = function() {
  // holds current inventory as shortName: quantity
  var current = {};

  // resource classification system
  this.C = {
    group: {
      // horizontal category, similar in processing
      organic: 'Organic',
      inorganic: 'Inorganic'
    },
    // vertical category, originating from same base
    family: {
      salt: 'Salt'
    }
  };

  // resource information
  this.library = {
    salt: {
      longName: 'Salt',
      group: this.C.group.inorganic,
      family: this.C.family.salt,
      unit: 'kg'
    }
  };

  this.add = function(res, num) {
    if (num < 0 || !(res in this.library)) return false;
    current[res] = current[res] || 0;
    current[res] += num;
    return current[res];
  };

  this.remove = function(res, num) {
    if (!(res in current) || !(res in this.library) || num < 0 || current[res] < num) {
      return false;
    } else {
      current[res] -= num;
      return current[res];
    }
  };

  this.current = function(res) {
    if (res in current) {
      return current[res];
    } else {
      return 0;
    }
  };

  // provides read-only resource list
  this.all = function() {
    return {}.merge(current);
  };
};
