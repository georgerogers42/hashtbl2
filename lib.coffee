#!/usr/bin/env coffee
_ = require "underscore"

exports.HashTbl = Htbl = (hf) ->
  ary = {}
  self = this
  self.size = () ->
    f = (acc, k) ->
      acc + ary[k].length
    _(Object.keys(ary)).reduce(f, 0)
  self.put = put = (k, v) ->
    h = hf.hash(k)
    buckets = ary[h] ?= []
    bucket = _.find buckets, (p) -> hf.equal p[0], k
    if bucket?
      bucket[1] = v
    else
      buckets.push [k, v]
  self.getPair = getPair = (k) ->
    h = hf.hash(k)
    _.find ary[h], (p) -> hf.equal p[0], k
  self.get = (k) ->
    p = getPair(k)
    p[1] if p?
  self.forEach = forEach = (f) ->
    for own k of ary
      for bucket in ary[k]
        f(bucket[0], bucket[1])
    return
  self.map = map = (f) ->
    ps = []
    forEach (k, v) ->
      ps.push f(k, v)
    return ps
  self.pairs = pairs = () -> map (p...) -> p
  self.keys = () -> map (k) -> k
  return

exports.hasher = hf =
  hash: (k) ->
    return k if _.isString(k) or (_.isNumber(k) and not _.isNaN(k)) or _.isBoolean(k)
    if typeof k.hashCode is "function"
      k.hashCode()
    else if _.isArray k
      a = ""
      for i, v in k
        a += hf.hash(i)
        a += hf.hash(v)
      return a
    else if _.isObject k
      a = ""
      for own i, v of k
        a += hf.hash(i)
        a += hf.hash(v)
      return a
  equal: (a, b) ->
    hf.hash(a) == hf.hash(b) and _.isEqual(a, b)
