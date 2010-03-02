
Ext.extend(Object.prototype, {

  /**
   * Includes the given _props_. Will automatically require a module if a
   * filename is passed. If _true_ is passed as the first argument, will
   * include a deep copy.
   *
   * { a: 1 }.include({ b: 2 })
   * // => { a: 1, b: 2}
   *
   * {}.include('./dir/some_module')
   * // => { ... }
   *
   * @param {bool} deep
   * @param {object} props
   * @api public
   */

  include: function () {
    var deep = arguments[0] === true,
        args = Array.prototype.slice.call(arguments, typeof arguments[0] === 'boolean' ? 1 : 0)

    args.each(function (src) {
      if (typeof src === 'string' || src instanceof String)
        src = require(src)

      for (var key in src) {
        var descriptor = Object.getOwnPropertyDescriptor(src, key)
        if (deep && typeof src[key] === 'object' && !descriptor.get)
          this[key] = this[key].include(deep, src[key])
        else
          Object.defineProperty(this, key, descriptor)
      }
    }, this)

    return this
  }

})

// GLOBAL.include is currently displaying a deprecation notice. Therefore we
// have to override it manually.
GLOBAL.include = Object.prototype.include

