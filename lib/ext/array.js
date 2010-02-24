var extensions = {
  /**
   * Shorthand for Array#forEach()
   *
   * @api public
   */
  each: Array.prototype.forEach,
  /**
   * Returns a Boolean value indicating the presence of the given item(s).
   * Can take a single item or an Array as its argument.
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
   * @param  {object} items
   * @return {boolean}
   * @api public
   */
  includes: function (items) {
    if (items instanceof Array) {
      var i = items.length
      while (i--)
        if (!arguments.callee.call(this, items[i])) return false

      return true
    }

    return this.indexOf(items) !== -1
  },
  /**
   * Points to the first element of the Array.
   *
   * @api public
   */
  get first()  { return this[0] },
  set first(v) { this[0] = v },
  /**
   * Points to the last element of the Array.
   *
   * @api public
   */
  get last()   { return this[this.length - 1 || 0] },
  set last(v)  { this[this.length - 1 || 0] = v },
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
  get flat() {
    var flat = [], i, type, l = this.length
    for (i = 0; i < l; i++) {
       type = Object.prototype.toString.call(this[i]).split(' ').pop().split(']').shift().toLowerCase()
       if (type)
         flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? arguments.callee.call(this[i]) : this[i])
    }
    return flat
  }
}

Object.getOwnPropertyNames(extensions).forEach(function (property) {
  var descriptor = Object.getOwnPropertyDescriptor(extensions, property)
  descriptor.enumerable = false
  Object.defineProperty(Array.prototype, property, descriptor)
})

