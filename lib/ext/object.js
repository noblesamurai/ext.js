
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
    obj.keys.each(function (key) {
      this[key] = reverse ? (this[key] === undefined) ? obj[key] : this[key] : obj[key];
    }, this)
    return this;
  }
})

