hashtbl = require "../lib"
expect = require "expect.js"

memo = (f) ->
  t = new hashtbl.HashTbl(hashtbl.hasher)
  (args...) ->
    x = t.get(args)
    if x?
      x
    else
      r = f(args...)
      t.put(args, r)
      r

fib = memo (n, x=1) ->
  if n > 2
    fib(n-1, x) + fib(n-2, x)
  else
    x

describe "hashtbl.HashTbl", () ->    
  h = new hashtbl.HashTbl(hashtbl.hasher)
  for i in [1..100]
    h.put i, i
  for i in [1..100]
    h.put i, 20
  it "should have a size that is equal to the amount of unique keys", () ->
    expect(h.size()).to.be(100)
  it "has the length of the pairs == the amount of unique keys", () ->
    expect(h.pairs().length).to.be(100)
