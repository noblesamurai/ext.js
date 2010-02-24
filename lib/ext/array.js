
// ext.js - Array - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

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
   * Get the value at the given _index_.
   *
   * @return {mixed}
   * @api public
   */
   
   at: function(index) { return this[index] },
  
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
    var array = [],
        remove = arguments.length
          ? Array.prototype.slice.call(arguments)
          : [undefined, null]
    for (var i = 0, len = this.length; i < len; ++i)
      if (remove.indexOf(this[i]) === -1)
        array.push(this[i])
    return array
  },
  
  /**
   * Returns a flattened version of the Array.
   *
   *  [1,[2,[3]]].flat
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
   * Reduce with _memo_ object.
   *
   *  [1,2,3,4].reduce([], function(evens, n){
   *     if (n % 2 === 0) evens.push(n)
   *    return evens
   *  })
   *  // => [2,4]
   *
   * @param  {mixed} memo
   * @param  {function} fn
   * @return {mixed}
   * @api public
   */
  
  reduce: function(memo, fn) {
    for (var i = 0, len = this.length; i < len; ++i)
      memo = fn(memo, this[i], i)
    return memo
  }
})
