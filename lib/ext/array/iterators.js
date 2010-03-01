
// ext.js - Array - Iterators - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Callback short-hand patterns.
 */

var property = /^\w+$/,
    operator = /^[^\w]/,
    method = /^\w+\(/

/**
 * Normalize callback _fn_. When a string is
 * passed convert the shorthand expr to a function.
 *
 * The following conversions are made:
 *
 *  - function(){} -> function(){}
 *  - 'length' -> function(a){ return a.length }
 *  - 'toString()' -> function(a){ return a.toString() }
 *  - '> 5' -> function(a){ return a > 5 }
 *
 * @param  {string, function} fn
 * @return {function}
 * @api private
 */

exports.callback = function(fn) {
  if (fn === undefined || fn instanceof Function)
    return fn
  if (property.test(fn) || method.test(fn))
    fn = 'a.' + fn
  if (operator.test(fn))
    fn = 'a ' + fn
  return Function('a, b, c', 'return ' + fn)
}

// --- Extension

Ext.extend(Array.prototype, {

  /**
   * Returns the first element for which the passed function returns true.
   *
   *  [1,2,3].detect(function (e) { return e === 2 })
   *  // => 2
   *
   *  [1,2,3].detect('=== 2')
   *  // => 2
   *
   * @param  {function} fn
   * @param  {object} context
   * @return {mixed}
   * @api public
   */

  detect: function (fn, context) {
    fn = exports.callback(fn)
    for (var i = 0, len = this.length; i < len; ++i)
      if (fn.call(context, this[i], i))
        return this[i]
  },

  /**
   * Shorthand for Array#forEach()
   *
   * @api public
   */

  each: Array.prototype.forEach,

  /**
   * Return values computed by the given _fn_,
   * with optional evaluation _context_.
   *
   * @param  {function} fn
   * @param  {mixed} context
   * @return {array}
   * @api public
   */

  map: function(fn, context) {
    var self = this,
        fn = exports.callback(fn)
    return this.reduce(function(mapped, val, key){
      mapped.push(fn.call(context, val, key, self))
      return mapped
    }, [])
  },

  /**
   * Reduce with optional _memo_ object, otherwise
   * the first value is passed.
   *
   *  [1,2,3,4].reduce(function(evens, n){
   *     if (n % 2 === 0) evens.push(n)
   *    return evens
   *  }, [])
   *  // => [2,4]
   *
   *  [1,2,3,4,5].reduce('a + b')
   *  // => 15
   *
   * @param  {function} fn
   * @param  {mixed} memo
   * @return {mixed}
   * @api public
   */

  reduce: function(fn, memo) {
    var i = 0,
        fn = exports.callback(fn),
        memo = memo === undefined ? this[i++] : memo
    for (var len = this.length; i < len; ++i)
      memo = fn(memo, this[i], i)
    return memo
  },

  /**
   * Select values when _fn_ returns a truthy value,
   * with optional evaluation _context_.
   *
   *  [1,2,3,4].filter(function(n){ return n % 2 === 0 })
   *  // => [2,4]
   *
   *  [1,2,3,4].filter('a % 2 === 0')
   *  // => [2,4]
   *
   * @param  {function} fn
   * @param  {mixed} context
   * @return {array}
   * @api public
   */

  filter: function(fn, context) {
    fn = exports.callback(fn)
    return this.reduce(function(filtered, val, key){
      if (fn.call(context, val, key))
        filtered.push(val)
      return filtered
    }, [])
  },

  /**
   * Reject values when _fn_ returns a truthy value, with
   * optional evaluation _context_.
   *
   *  [1,2,3,4].reject(function(n){ return n % 2 === 0 })
   *  // => [1,3]
   *
   *  [1,2,3,4].reject('a % 2 === 0')
   *  // => [1,3]
   *
   * @param  {function} fn
   * @param  {mixed} context
   * @return {array}
   * @api public
   */

  reject: function(fn, context) {
    fn = exports.callback(fn)
    return this.reduce(function(selected, val, key){
      if (!fn.call(context, val, key))
        selected.push(val)
      return selected
    }, [])
  },

  /**
   * Check if _fn_ evaluates to true at least once,
   * with optional evaluation _context_.
   *
   * @param  {function} fn
   * @param  {mixed} context
   * @return {bool}
   * @api public
   */

  some: function(fn, context) {
    fn = exports.callback(fn)
    return this.reduce(function(state, val, key){
      if (!state)
        state = fn.call(context, val, key)
      return state
    }, false)
  },

  /**
   * Check if _fn_ always evaluates to false, with
   * optional evaluation _context_.
   *
   * @param  {function} fn
   * @param  {mixed} context
   * @return {bool}
   * @api public
   */

  none: function(fn, context) {
    fn = exports.callback(fn)
    return this.reduce(function(state, val, key){
      if (state)
        state = ! fn.call(context, val, key)
      return state
    }, true)
  }
})

// --- Aliases

Ext.extend(Array.prototype, {
  any: Array.prototype.some,
  find: Array.prototype.detect,
  select: Array.prototype.filter
})

