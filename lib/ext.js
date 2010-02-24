
// ext.js - Core - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Version.
 */

Ext = { version: '0.0.1' }

/**
 * Extend _constructor_ with the given _props_.
 *
 * @param  {function} constructor
 * @param  {hash} props
 * @api public
 */

Ext.extend = function(constructor, props) {
  Object.getOwnPropertyNames(props).forEach(function(prop){
    var descriptor = Object.getOwnPropertyDescriptor(props, prop)
    descriptor.enumerable = false
    Object.defineProperty(constructor.prototype, prop, descriptor)
  })
}

require('ext/import')

