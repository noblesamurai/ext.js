
// ext.js - Object - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Module dependencies.
 */
 
var callback = require('ext/array/iterators').callback

// --- Iterators

Ext.extend(Object.prototype, {
  
  /**
   * Reduce with optional _memo_ object, otherwise
   * the first value is passed.
   *
   *  { a: 1, b: 2, c: 3 }.reduce(function(evens, n){
   *     if (n % 2 === 0) evens.push(n)
   *    return evens
   *  }, [])
   *  // => [2]
   *
   *  { a: 1, b: 2, c: 3 }.reduce('a + b')
   *  // => 6
   *
   * @param  {function} fn
   * @param  {mixed} memo
   * @return {mixed}
   * @api public
   */
   
  reduce: function(fn, memo) {
    var fn = callback(fn)
    this.each(function(val, key){
      memo = memo === undefined
      ? val
      : fn(memo, val, key)
    })
    return memo
  },

  /**
   * Returns an object with the keys mapped to the return value of the given function.
   *
   * @param {function} fn
   * @param {object} context
   * @return {object}
   * @api public
   */

  map: function (fn, context) {
    var mapped = {},
        fn = callback(fn)
    this.each(function(val, key) {
      mapped[key] = fn.call(context, val, key, this)
    }, this)
    return mapped
  },

  /**
   * Invokes the given function for each key. Returns _this_.
   *
   * @param {function} fn
   * @param {object} context
   * @return {object}
   * @api public
   */

  each: function (fn, context) {
    this.keys.each(function (key) {
      fn.call(context, this[key], key, this)
    }, this)
    return this
  },

  /**
   * Returns a new object containing the keys the given function returned true for.
   *
   * @param {function} fn
   * @param {object} context
   * @return {object}
   * @api public
   */

  filter: function (fn, context) {
    var filtered = {},
        fn = callback(fn)
    this.each(function(val, key) {
      if (fn.call(context, val, key, this))
        filtered[key] = val
    }, this)
    return filtered
  },

  /**
   * Returns a new object without the keys the given function returned true for.
   *
   * @param {function} fn
   * @param {object} context
   * @return {object}
   * @api public
   */

  reject: function (fn, context) {
    var rejected = {},
        fn = callback(fn)
    this.each(function(val, key) {
      if (!fn.call(context, val, key, this))
        rejected[key] = val
    }, this)
    return rejected
  },

  /**
   * Returns true if every property satisfies the provided testing function.
   *
   * @param {function} fn
   * @param {object} context
   * @return {object}
   * @api public
   */

  every: function (fn, context) {
    var state = true,
        fn = callback(fn)
    this.each(function(val, key) {
      if (!fn.call(context, val, key, this))
        state = false
    }, this)
    return state
  },

  /**
   * Returns true if at least one property satisfies the provided testing function.
   *
   * @param {function} fn
   * @param {object} context
   * @return {object}
   * @api public
   */

  some: function (fn, context) {
    var state = false,
        fn = callback(fn)
    this.each(function(val, key) {
      if (fn.call(context, val, key, this))
        state = true
    }, this)
    return state
  }
})

// --- Aliases

Ext.extend(Object.prototype, {
  any: Object.prototype.some,
  all: Object.prototype.every,
  select: Object.prototype.filter
})

