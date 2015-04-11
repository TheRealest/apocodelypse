module.exports = function() {
  // holds current producers as shortName: quantity
  var current = {
    producers: {},
    upgrades: {}
  };

  // producer classification system
  this.C = {
    type: {
      // used for upgrades
      // resource type
      salt: 'Salt',

      // producer type
      mine: 'Mine'
    }
  };

  // producer information
  this.library = {
    producer: {
      saltMine: {
        longName: 'Salt Mine',
        type: [this.C.type.salt, this.C.type.mine],
        rate: 1,
        produce: 'salt'
      }
    },
    upgrade: {
      mine1: {
        longName: 'Diamond Drill Bits',
        type: [this.C.type.mine],
        rate: 2
      },
      salt1: {
        longName: 'Salt Extraction Techniques',
        type: [this.C.type.salt],
        rate: 2
      }
    }
  };

  this.add = function(prod, num) {
    if (num < 0 || !(prod in this.library.producer)) return false;
    current.producers[prod] = current.producers[prod] || 0;
    current.producers[prod] += num;
    return current.producers[prod];
  };

  this.remove = function(prod, num) {
    if (!(prod in current.producers) || !(prod in this.library.producer) || num < 0 || current.producers[prod] < num) {
      return false;
    } else {
      current.producers[prod] -= num;
      return current.producers[prod];
    }
  };

  this.upgrade = function(up) {
    if (!(up in this.library.upgrade)) return false;
    current.upgrades[up] = true;
    return true;
  };

  this.downgrade = function(down) {
    if (!(down in this.library.upgrade)) return false;
    current.upgrades[down] = false;
    return false;
  };

  this.current = {
    producer: function(prod) {
      if (prod in current.producers) {
        return current.producers[prod];
      } else {
        return 0;
      }
    },
    upgrade: function(up) {
      if (up in current.upgrades) {
        return current.upgrades[up];
      } else {
        return false;
      }
    }
  };

  // provides read-only resource list
  this.all = {
    producers: function() {
      return {}.merge(current.producers);
    },
    upgrades: function() {
      return {}.merge(current.upgrades.filter(function(u) {return u;}));
    }
  };
};
