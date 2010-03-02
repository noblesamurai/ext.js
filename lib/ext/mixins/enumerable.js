
// ext.js - Enumerable - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Callback short-hand patterns.
 */

var operator = /^[^\w]/,
    method = /^\w+\(/

/**
 * Normalize callback _fn_. When a string is
 * passed convert the shorthand expr to a function.
 *
 * The following conversions are made:
 *
 *  - function(){} -> function(){}
 *  - '.length' -> function(a){ return a.length }
 *  - '.toString()' -> function(a){ return a.toString() }
 *  - '> 5' -> function(a){ return a > 5 }
 *
 * @param  {string, function} fn
 * @return {function}
 * @api private
 */

function callback(fn) {
  if (fn instanceof Function) return fn
  return (operator.test(fn) || method.test(fn) || fn.includes('->') ? fn : 'a b c -> ' + fn).lambda
}

// --- Exports

process.mixin(exports, {
  
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
    var mapped = Object.create(Object.getPrototypeOf(this)),
        fn = callback(fn)
    this.each(function(val, key) {
      val = fn.call(context, val, key, this)
      mapped.push ? mapped.push(val) : mapped[key] = val
    }, this)
    return mapped
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
    var filtered = Object.create(Object.getPrototypeOf(this)),
        fn = callback(fn)
    this.each(function(val, key) {
      if (fn.call(context, val, key, this))
        filtered.push ? filtered.push(val) : filtered[key] = val
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
    var rejected = Object.create(Object.getPrototypeOf(this)),
        fn = callback(fn)
    this.each(function(val, key) {
      if (!fn.call(context, val, key, this))
        rejected.push ? rejected.push(val) : rejected[key] = val
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
   * Returns the first value for which the passed function returns true.
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
    fn = callback(fn)
    var retval
    this.each(function (val, key, self) {
      if (!retval && fn.call(context, val, key, self))
        retval = val
    })
    return retval;
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
    fn = callback(fn)
    var state = true
    this.each(function (val, key, self) {
      if (state)
        state = ! fn.call(context, val, key, self)
    })
    return state
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
    var fn = callback(fn),
        memo = memo === undefined ? this[0] : memo
    this.each(function (val, key, self) {
      if (key !== 0) memo = fn(memo, val, key, self)
    })
    return memo
  }
})

// --- Aliases

process.mixin(exports, {
  any: exports.some,
  all: exports.every,
  find: exports.detect,
  select: exports.filter,
  inject: exports.reduce
})

