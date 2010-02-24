var extensions = {
  /**
   * Shorthand for Array#forEach()
   *
   * @api public
   */
  each: Array.prototype.forEach
}

Object.getOwnPropertyNames(extensions).forEach(function (property) {
  var descriptor = Object.getOwnPropertyDescriptor(extensions, property)
  descriptor.enumerable = false
  Object.defineProperty(Array.prototype, property, descriptor)
})

