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
  set last(v)  { this[this.length - 1 || 0] = v }
}

Object.getOwnPropertyNames(extensions).forEach(function (property) {
  var descriptor = Object.getOwnPropertyDescriptor(extensions, property)
  descriptor.enumerable = false
  Object.defineProperty(Array.prototype, property, descriptor)
})

