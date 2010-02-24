
// ext.js - Array - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

Ext.extend(Array, {
  
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
   * @return {boolean}
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
   * @api public
   */
  
  get first() { return this[0] },
  set first(val) { this[0] = val },
  
  /**
   * Get / Set the last element of the Array.
   *
   * @api public
   */
   
  get last() { return this[this.length - 1 || 0] },
  set last(val) { this[this.length - 1 || 0] = val },
  
  /**
   * Removes null and undefined elements from the Array.
   * If `true` is passed, `null` elements will remain.
   *
   *  [1,2,undefined,null].compact()
   *  // => [1,2]
   *
   *  [1,2,undefined,null].compact(true)
   *  // => [1,2,null]
   *
   * @param  {boolean} keepNull
   * @return {boolean}
   * @api public
   */
   
  compact: function (keepNull) {
    var i = this.length
    while (i--)
      if (this[i] === undefined || (!keepNull && this[i] === null)) {
          this.splice(i, 1)
          i++
      }
    return this
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
  }
})
