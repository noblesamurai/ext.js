Ext.extend(Object, {
  /**
   * Helper for aliasing methods to provide a uniform syntax with
   * Object#aliasMethodChain().
   *
   *   anObject.alias('newName', 'currentName')
   *
   *   anObject.alias('newName', 'currentName', sourceObject)
   *
   * @param  {string} target
   * @param  {string} method
   * @param  {function} source
   * @api public
   */
  alias: function (target, method, source) {
    this[target] = source ? source[method] : this[method]
    return this
  },
  /**
   * The famous Object#aliasMethodChain().
   *
   * Chain aliases a method to be extended with a given feature.
   *
   *   anObject.aliasMethodChain('method', 'feature')
   *   => anObject.alias('methodWithoutFeature', 'method')
   *   => anObject.alias('method', 'methodWithFeature')
   *
   * @param  {string} target
   * @param  {string} feature
   * @api public
   */
  aliasMethodChain: function (target, feature, object) {
    this.alias(target + 'Without' + feature.camelcase, target)
        .alias(target, target + 'With' + feature.camelcase, object);

    return this;
  }
})
