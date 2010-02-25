
// ext.js - Array - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Callback short-hand patterns.
 */

var property = /^\w+$/,
    method = /^\w+\(/

/**
 * Normalize callback _fn_. When a string is
 * passed convert the shorthand expr to a function.
 *
 *  - Functions are passed through un-touched
 *  - Strings with length of < 4 are considered operators between a and b
 *  - Single words are considered properties on a
 *  - Single functions are considered method calls on a
 *  - Larger strings are considered return expressions
 *
 * @param  {string, function} fn
 * @return {function}
 * @api private
 */

function callback(fn) {
  if (fn === undefined) return
  if (fn instanceof Function) return fn
  if (fn.length < 4) return Function('a, b, c', 'return a ' + fn + ' b')
  if (property.test(fn) || method.test(fn)) fn = 'a.' + fn
  return Function('a, b, c', 'return ' + fn)
}

Ext.extend(Array.prototype, {
  
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
    return this.reduce(0, '+')
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
      return !remove.includes(val)
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
      if (fn(val, key))
        selected.push(val)
      return selected
    })
  }
})
