
// ext.js - Object - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('ext').extend(Object.prototype, {

  /**
   * Invokes the given function for each key. Returns _this_.
   *
   * Required to support the Enumerable mixin.
   *
   * @param {function} fn
   * @param {object} context
   * @return {object}
   * @api public
   */

  each: function (fn, context) {
    var keys = this.keys
    for (var i = 0, len = keys.length; i < len; ++i)
      fn.call(context, this[keys[i]], keys[i], this)
    return this
  }

})

require('ext').extend(Object.prototype, require('ext/mixins/enumerable'))

