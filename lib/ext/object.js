var extensions = {
  /**
   * Helper for aliasing methods to provide a uniform syntax with
   * Object#aliasMethodChain().
   *
   *   anObject.alias('newName', 'currentName')
   *
   *   anObject.alias('newName', 'currentName', sourceObject)
   *
   * @param  {bool} all
   * @return {string}
   * @api public
   */
  alias: function (target, method, object) {
    this[target] = object ? object[method] : this[method]
    return this
  }
}

Object.getOwnPropertyNames(extensions).forEach(function (property) {
  var descriptor = Object.getOwnPropertyDescriptor(extensions, property);
  descriptor.enumerable = false;
  Object.defineProperty(Object.prototype, property, descriptor);
});

