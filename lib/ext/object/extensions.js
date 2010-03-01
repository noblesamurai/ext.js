
// ext.js - Object - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

// --- Extensions

Ext.extend(Object.prototype, {

  /**
   * Return a shallow clone.
   *
   * @return {mixed}
   * @api public
   */

  get clone() {
    var clone = Object.create(Object.getPrototypeOf(this))
    Object.getOwnPropertyNames(this).each(function(key) {
      Object.defineProperty(clone, key, Object.getOwnPropertyDescriptor(this, key))
    }, this)
    return clone
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
   * Merges all values from the given _obj_.
   * 
   * @param  {object} obj
   * @return {object}
   * @api public
   */

  merge: function (obj) {
    obj.each(function(val, key) {
      this[key] = val
    }, this)
    return this;
  },

  /**
   * Check whether this object has a functioned named _key_.
   *
   * @param {string} key
   * @return {object}
   * @api public
   */

  respondsTo: function(key) {
    return typeof this[key] === 'function'
  }
})

