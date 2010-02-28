
// ext.js - Object - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Dummy clone constructor.
 */

function Clone() {}

// --- Extensions

Ext.extend(Object.prototype, {

  /**
   * Return a shallow clone.
   *
   * @return {mixed}
   * @api public
   */

  get clone() {
    Clone.prototype = this
    return new Clone
  },

  /**
   * Return own property keys.
   *
   *  { foo: 'bar' }.keys
   *  // => ['foo']
   *
   * @return {array}
   * @api public
   */

  get keys() {
    return Object.keys(this)
  },

  /**
   * Return own property values.
   *
   *  { foo: 'bar' }.values
   *  // => ['bar']
   *
   * @return {array}
   * @api public
   */

  get values() {
    return this.keys.map(function(key){ return this[key] }, this)
  },

  /**
   * Passes _this_ to the given function and then returns _this_.
   * Allows to *tap* into into function call chains.
   *
   * @param {function} fn
   * @param {object} context
   * @return {object}
   * @api public
   */

  tap: function (fn, context) {
    fn.call(context || this, this)
    return this;
  },

  /**
   * Merges all values from the given object. Already existing keys will be overwritten,
   * unless _reverse_ is true.
   *
   * @param {object} obj
   * @param {bool} reverse
   * @return {object}
   * @api public
   */

  merge: function (obj, reverse) {
    obj.each(function (value, key) {
      this[key] = reverse ? (this[key] === undefined) ? value : this[key] : value;
    }, this)
    return this;
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
    var mapped = {}
    context    = context || this

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
    context = context || this

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
    context      = context || this

    this.each(function (value, key) {
      if (fn.call(context, value, key, this)) filtered[key] = value
    }, this)
    return filtered;
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
    context      = context || this
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
    context      = context || this
    var retval   = false

    this.each(function (value, key) {
      if (fn.call(context, value, key, this)) retval = true
    }, this)

    return retval;
  },

  /**
   * Returns a Boolean value that indicates whether the object contains a
   * function corresponding to _key_.
   *
   * @param {string} key
   * @return {object}
   * @api public
   */

  respondsTo: function (key) {
    return typeof this[key] === 'function'
  }
})

