
// ext.js - Array - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

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
   * Removed all values strictly matching _obj_ from the array.
   *
   *  [1,2,2,2,3].remove(2)
   *  // => [1,3]
   *
   *  [1,2,2,2,3].reject('=== 2')
   *  // => [1,3]
   *
   * @param {mixed} obj
   * @return {array}
   * @api public
   */

  remove: function (obj) {
    return this.reject(function(val){
      return val === obj
    })
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
     return this.filter(function(val){
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
    return this.filter(function(val){
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
  }
})

