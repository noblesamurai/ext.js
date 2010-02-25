
// ext.js - Array - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

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

function callback(fn) {
  if (fn === undefined || fn instanceof Function)
    return fn
  if (property.test(fn) || method.test(fn))
    fn = 'a.' + fn
  if (operator.test(fn))
    fn = 'a ' + fn
  return Function('a, b, c', 'return ' + fn)
}

// Keep references to the original functions.
var mapWithoutShorthand = Array.prototype.map
var reduceWithoutMemo   = Array.prototype.reduce

Ext.extend(Array.prototype, {

  /**
   * Returns a Boolean value that indicates whether the Array is empty.
   *
   *  [].isEmpty
   *  // => true
   *
   *  [1,2,3].isEmpty
   *  // => false
   *
   * @return {bool}
   * @api public
   */
  get isEmpty() { return this.length === 0 },

  /**
   * Removed all elements strictly matching _obj_ from the array. If the item
   * is not found, returns undefined. If an optional function is given, returns
   * the result of the function if the item is not found.
   *
   *  [1,2,2,2,3].remove(2)
   *  // => [1,3]
   *
   * @param {mixed} obj
   * @param {function} fn
   * @param {object} scope
   * @return {mixed}
   * @api public
   */

  remove: function (obj, fn, scope) {
    var i = this.length, deleted = 0
    while (i--)
      if (this[i] === obj) {
        this.splice(i, 1)
        ++deleted
      }
    return deleted ? this : fn ? fn.call(scope || this) : undefined
  },

  /**
   * Removes all values.
   *
   *  [1,2,3].clear
   *  // => []
   *
   * @return {this}
   * @api public
   */

  get clear() {
    this.length = 0
    return this
  },

  /**
   * Returns the first element for which the passed function returns true.
   *
   *  [1,2,3].detect(function (e) { return e === 2 })
   *  // => 2
   *
   * @param  {function} fn
   * @param  {object}   scope
   * @return {mixed}
   * @api public
   */

  detect: function (fn, scope) {
    scope = scope || this;
    for (var i = 0, len = this.length; i < len; ++i)
      if (fn.call(scope, this[i], i, this)) return this[i];
  },

  /**
   * Shorthand for Array#forEach()
   *
   * @api public
   */

  each: Array.prototype.forEach,

  /**
   * Returns a Boolean value indicating the presence of the given item(s).
   * Accepts a single item, an array of items, or several arguments.
   *
   *  [1,2,3].includes(1)
   *  // => true
   *
   *  [1,2,3].includes(4)
   *  // => false
   *
   *  [1,2,3].includes([1,2,3,4])
   *  // => false
   *
   *  [1,2,3].includes([1,2,3])
   *  // => true
   *
   *  ['foo', 'bar'].includes('bar', 'foo')
   *  // => true
   *
   * @param  {mixed} items
   * @return {bool}
   * @api public
   */

  includes: function (items) {
    if (!(items instanceof Array))
      items = Array.prototype.slice.call(arguments)
    for (var i = 0, len = items.length; i < len; ++i)
      if (this.indexOf(items[i]) === -1)
        return false
    return true
  },

  /**
   * Negated version of #includes().
   *
   * @param  {mixed} items
   * @return {bool}
   * @api public
   */

  excludes: function() {
    return ! this.includes.apply(this, arguments)
  },

  /**
   * Get / Set the first element of the Array.
   *
   * @return {mixed}
   * @api public
   */

  get first() { return this[0] },
  set first(val) { this[0] = val },

  /**
   * Get / Set the last element of the Array.
   *
   * @return {mixed}
   * @api public
   */

  get last() { return this[this.length - 1 || 0] },
  set last(val) { this[this.length - 1 || 0] = val },

  /**
   * Return a random value.
   *
   *  [1,2,3].sample
   *  // => 1
   *
   *  [1,2,3].sample
   *  // => 3
   *
   * @return {mixed}
   * @api public
   */

  get sample() {
    return this[Math.floor(Math.random() * this.length)]
  },

  /**
   * Return sum of values.
   *
   *  [1,2,3,4,5].sum
   *  // => 15
   *
   * @return {number}
   * @api public
   */

  get sum() {
    return this.reduce(0, 'a + b')
  },

  /**
   * Return average of values.
   *
   *  [1,2,3,4,5].avg
   *  // => 5
   *
   * @return {number}
   * @api public
   */

  get avg() {
    return this.sum / this.length
  },

  /**
   * Return lowest value.
   *
   * @return {number}
   * @api public
   */

  get min() {
    return this.reduce(this.first, function(min, n){
      return n < min ? n : min
    })
  },

  /**
   * Return largest value.
   *
   * @return {number}
   * @api public
   */

  get max() {
    return this.reduce(this.first, function(max, n){
      return n > max ? n : max
    })
  },

  /**
   * Get the value at the given _index_.
   *
   * @return {mixed}
   * @api public
   */

   at: function(index) { return this[index] },

   /**
    * Drop the first _n_ values.
    *
    * @param  {int} n
    * @return {array}
    * @api public
    */

   drop: function(n) {
     return this.slice(n, this.length)
   },

   /**
    * Take the first _n_ values.
    *
    * @param  {int} n
    * @return {array}
    * @api public
    */

   take: function(n) {
     return this.slice(0, n)
   },

   /**
    * Select values matching _pattern_.
    *
    *  ['foo', 'foobar', 'bar'].grep(/^foo(bar)?/)
    *  // => ['foo', 'foobar']
    *
    * @param  {regexp} pattern
    * @return {array}
    * @api public
    */

   grep: function(pattern) {
     return this.select(function(val){
       return pattern.test(val)
     })
   },

  /**
   * Returns a new array void of the given args,
   * which default to [undefined, null].
   *
   *  [1,2,undefined,null].compact()
   *  // => [1,2]
   *
   *  [1,2,undefined,null].compact(null)
   *  // => [1,2,undefined]
   *
   *  [false, null, undefined, -1, 0].compact(null, undefined, false, -1, 0)
   *  // => []
   *
   * @param  {mixed} ...
   * @return {array}
   * @api public
   */

  compact: function () {
    var remove = arguments.length
          ? Array.prototype.slice.call(arguments)
          : [undefined, null]
    return this.select(function(val){
      return remove.excludes(val)
    })
  },

  /**
   * Returns a flattened version of the Array.
   *
   *  [1,[2,[3]]].flatten
   *  // => [1,2,3]
   *
   * @return {array}
   * @api public
   */

  get flatten() {
    var flat = [], i, type, l = this.length
    for (i = 0; i < l; i++) {
       type = Object.prototype.toString.call(this[i]).split(' ').pop().split(']').shift().toLowerCase()
       if (type)
         flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? arguments.callee.call(this[i]) : this[i])
    }
    return flat
  },

  /**
   * Return values computed by the given _fn_.
   *
   * @param  {function} fn
   * @return {array}
   * @api public
   */

  map: function(fn) {
    if (fn instanceof Function)
      return mapWithoutShorthand.apply(this, arguments)

    fn = callback(fn)
    return this.reduce([], function(mapped, val, key){
      mapped.push(fn(val, key))
      return mapped
    })
  },

  /**
   * Reduce with _memo_ object.
   *
   *  [1,2,3,4].reduce([], function(evens, n){
   *     if (n % 2 === 0) evens.push(n)
   *    return evens
   *  })
   *  // => [2,4]
   *
   *  [1,2,3,4,5].reduce(0, '+')
   *  // => 15
   *
   * @param  {mixed} memo
   * @param  {function} fn
   * @return {mixed}
   * @api public
   */

  reduce: function(memo, fn) {
    if (memo instanceof Function)
      return reduceWithoutMemo.apply(this, arguments)

    fn = callback(fn)
    for (var i = 0, len = this.length; i < len; ++i)
      memo = fn(memo, this[i], i)
    return memo
  },

  /**
   * Select values when _fn_ returns a truthy value.
   *
   *  [1,2,3,4].select(function(n){ return n % 2 === 0 })
   *  // => [2,4]
   *
   *  [1,2,3,4].select('a % 2 === 0')
   *  // => [2,4]
   *
   * @param  {function} fn
   * @return {array}
   * @api public
   */

  select: function(fn) {
    fn = callback(fn)
    return this.reduce([], function(selected, val, key){
      if (fn(val, key)) selected.push(val)
      return selected
    })
  },

  /**
   * Check if _fn_ evaluates to true at least once.
   *
   * @param  {function} fn
   * @return {bool}
   * @api public
   */

  any: function(fn) {
    fn = callback(fn)
    return this.reduce(false, function(state, val, key){
      if (!state) state = fn(val, key)
      return state
    })
  },

  /**
   * Check if _fn_ always evaluates to false.
   *
   * @param  {function} fn
   * @return {bool}
   * @api public
   */

  none: function(fn) {
    fn = callback(fn)
    return this.reduce(true, function(state, val, key){
      if (state) state = ! fn(val, key)
      return state
    })
  }
})

