
// ext.js - Object - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

// --- Iterators

Ext.extend(Object.prototype, {

  /**
   * Returns an object with the keys mapped to the return value of the given function.
   *
   * @param {function} fn
   * @param {object} context
   * @return {object}
   * @api public
   */

  map: function (fn, context) {
    var mapped = {}
    this.each(function (value, key) {
      mapped[key] = fn.call(context, value, key, this)
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
    return this;
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
    var filtered = {}
    this.each(function (value, key) {
      if (fn.call(context, value, key, this)) filtered[key] = value
    }, this)
    return filtered;
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
    var rejected = {}
    this.each(function (value, key) {
      if (!fn.call(context, value, key, this)) rejected[key] = value
    }, this)
    return rejected;
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
    var retval   = true
    this.each(function (value, key) {
      if (!fn.call(context, value, key, this)) retval = false
    }, this)
    return retval;
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
    var retval   = false
    this.each(function (value, key) {
      if (fn.call(context, value, key, this)) retval = true
    }, this)
    return retval;
  }

})

