
// ext.js - Core - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Version.
 */

Ext = { version: '0.0.1' }

/**
 * Extend _obj_ with the given _props_.
 *
 * @param  {mixed} obj
 * @param  {hash} props
 * @api public
 */

Ext.extend = function(obj, props) {
  Object.getOwnPropertyNames(props).forEach(function(prop){
    var descriptor = Object.getOwnPropertyDescriptor(props, prop)
    descriptor.enumerable = false
    Object.defineProperty(obj, prop, descriptor)
  })
}

require('ext/import')

