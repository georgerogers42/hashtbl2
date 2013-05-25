hashtbl = require "../lib"
_ = require "underscore"
expect = require "expect.js"

memo = (t, f) ->
  t ||= new hashtbl.HashTbl(hashtbl.hasher)
  (args...) ->
    x = t.get(args)
    if x?
      x
    else
      r = f(args...)
      t.put(args, r)
      r

fib = (n) ->
  if n > 2
    fib(n-1) + fib(n-2)
  else
    1

describe "hashtbl.HashTbl::size", () ->    
  h = new hashtbl.HashTbl(hashtbl.hasher)
  for i in [1..100]
    h.put i, i
  for i in [1..100]
    h.put i, 20
  it "should have a size that is equal to the amount of unique keys", () ->
    expect(h.size()).to.be(100)
  it "has the length of the pairs == the amount of unique keys", () ->
    expect(h.pairs().length).to.be(100)
describe "memo fib", () ->
  h = new hashtbl.HashTbl(hashtbl.hasher)
  fib = memo h, fib
  it "of 40 should == 102334155", () ->
    expect(fib 40).to.be(102334155)
  it "memo table should have 40 keys", () ->
    expect(h.size()).to.be(40)
  it "pairs", () ->
    expect(h.pairs().length).to.be(40)
  it "#keys", () ->
    expect(_.chain(h.keys()).pluck(0).sort().value())
      .to.be.eql([1..40].sort())
