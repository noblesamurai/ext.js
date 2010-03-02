
/**
 * Extend _obj_ with the given _props_.
 *
 * @param  {mixed} obj
 * @param  {hash} props
 * @api public
 */

exports.extend = function(obj, props) {
  Object.getOwnPropertyNames(props).forEach(function(prop){
    var descriptor = Object.getOwnPropertyDescriptor(props, prop)
    descriptor.enumerable = false
    Object.defineProperty(obj, prop, descriptor)
  })
}

