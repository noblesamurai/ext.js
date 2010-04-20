
// ext.js - Array - Iterators - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('ext').extend(Array.prototype, {

  /**
   * Shorthand for Array#forEach()
   *
   * Required to support the Enumerable mixin.
   *
   * @api public
   */

  each: Array.prototype.forEach

})

require('ext').extend(Array.prototype, require('ext/mixins/enumerable'))

