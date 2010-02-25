
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
   *  { foo: 'bar' }.keys
   *  // => ['bar']
   *
   * @return {array}
   * @api public
   */

  get values() {
    return this.keys.map(function (k) { return this[k] }, this)
  },

  /**
   * Returns an object contained in another, indexed or named object and
   * removes it from the parent. If no index _i_ is given, assumes the object
   * to be located at the highest index. If the given index _i_ is a string,
   * will remove the value corresponding to the key from the parent and
   * return the value.
   *
   * Returns an empty object if the value at the expected index or key is not
   * an object or if the object is not indexed.
   *
   * This method is especially useful for extracting additional options hashes
   * from Argument objects.
   *
   *  {1: 1, 2: 2, 3:{ foo: 'bar' }.extract()
   *  // => { foo: 'bar' }
   *
   * @param {mixed} i
   * @return {object}
   * @api public
   */

  extract: function (i) {
    if (!i && this.length && typeof this[this.length - 1] === 'object')
      return Array.prototype.pop.call(this)
    else if (i && typeof i === 'number' && typeof this[i] === 'object')
      return Array.prototype.splice.call(this, i, 1)[0]
    else if ((typeof i === 'string' || i instanceof String) && typeof this[i] === 'object') {
      var retval = this[i]
      delete this[i]
      return retval
    }
    return {}
  }

})

