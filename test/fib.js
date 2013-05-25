// Generated by CoffeeScript 1.6.2
(function() {
  var expect, fib, hashtbl, memo, _,
    __slice = [].slice;

  hashtbl = require("../lib");

  _ = require("underscore");

  expect = require("expect.js");

  memo = function(t, f) {
    t || (t = new hashtbl.HashTbl(hashtbl.hasher));
    return function() {
      var args, r, x;

      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      x = t.get(args);
      if (x != null) {
        return x;
      } else {
        r = f.apply(null, args);
        t.put(args, r);
        return r;
      }
    };
  };

  fib = function(n) {
    if (n > 2) {
      return fib(n - 1) + fib(n - 2);
    } else {
      return 1;
    }
  };

  describe("hashtbl.HashTbl::size", function() {
    var h, i, _i, _j;

    h = new hashtbl.HashTbl(hashtbl.hasher);
    for (i = _i = 1; _i <= 100; i = ++_i) {
      h.put(i, i);
    }
    for (i = _j = 1; _j <= 100; i = ++_j) {
      h.put(i, 20);
    }
    it("should have a size that is equal to the amount of unique keys", function() {
      return expect(h.size()).to.be(100);
    });
    return it("has the length of the pairs == the amount of unique keys", function() {
      return expect(h.pairs().length).to.be(100);
    });
  });

  describe("memo fib", function() {
    var h;

    h = new hashtbl.HashTbl(hashtbl.hasher);
    fib = memo(h, fib);
    it("of 40 should == 102334155", function() {
      return expect(fib(40)).to.be(102334155);
    });
    it("memo table should have 40 keys", function() {
      return expect(h.size()).to.be(40);
    });
    it("pairs", function() {
      return expect(h.pairs().length).to.be(40);
    });
    return it("#keys", function() {
      var _i, _results;

      return expect(_.chain(h.keys()).pluck(0).sort().value()).to.be.eql((function() {
        _results = [];
        for (_i = 1; _i <= 40; _i++){ _results.push(_i); }
        return _results;
      }).apply(this).sort());
    });
  });

}).call(this);
