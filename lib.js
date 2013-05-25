// Generated by CoffeeScript 1.6.2
(function() {
  var Htbl, hf, _,
    __hasProp = {}.hasOwnProperty;

  _ = require("underscore");

  exports.HashTbl = Htbl = function(hf) {
    var ary, forEach, getPair, pairs, put, self;

    ary = {};
    self = this;
    self.size = function() {
      var f;

      f = function(acc, k) {
        return acc + ary[k].length;
      };
      return _(Object.keys(ary)).reduce(f, 0);
    };
    self.put = put = function(k, v) {
      var bucket, buckets, h, _ref;

      h = hf.hash(k);
      buckets = (_ref = ary[h]) != null ? _ref : ary[h] = [];
      bucket = _.find(buckets, function(p) {
        return hf.equal(p[0], k);
      });
      if (bucket != null) {
        return bucket[1] = v;
      } else {
        return buckets.push([k, v]);
      }
    };
    self.getPair = getPair = function(k) {
      var h;

      h = hf.hash(k);
      return _.find(ary[h], function(p) {
        return hf.equal(p[0], k);
      });
    };
    self.get = function(k) {
      var p;

      p = getPair(k);
      if (p != null) {
        return p[1];
      }
    };
    self.forEach = forEach = function(f) {
      var bucket, k, _i, _len, _ref;

      for (k in ary) {
        if (!__hasProp.call(ary, k)) continue;
        _ref = ary[k];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          bucket = _ref[_i];
          f(bucket[0], bucket[1]);
        }
      }
    };
    self.pairs = pairs = function() {
      var ps;

      ps = [];
      forEach(function(k, v) {
        return ps.push([k, v]);
      });
      return ps;
    };
    self.keys = function() {
      var ps;

      ps = [];
      forEach(function(k) {
        return ps.push(k);
      });
      return ps;
    };
  };

  exports.hasher = hf = {
    hash: function(k) {
      var a, i, v, _i, _len;

      if (_.isString(k) || (_.isNumber(k) && !_.isNaN(k)) || _.isBoolean(k)) {
        return k;
      }
      if (typeof k.hashCode === "function") {
        return k.hashCode();
      } else if (_.isArray(k)) {
        a = "";
        for (v = _i = 0, _len = k.length; _i < _len; v = ++_i) {
          i = k[v];
          a += hf.hash(i);
          a += hf.hash(v);
        }
        return a;
      } else if (_.isObject(k)) {
        a = "";
        for (i in k) {
          if (!__hasProp.call(k, i)) continue;
          v = k[i];
          a += hf.hash(i);
          a += hf.hash(v);
        }
        return a;
      }
    },
    equal: function(a, b) {
      return hf.hash(a) === hf.hash(b) && _.isEqual(a, b);
    }
  };

}).call(this);
