
// ext.js - Core - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

Ext = {
  
  /**
   * Version.
   */
  
  version: '0.2.5',
  
  /**
   * Extend _obj_ with _props_, where all _props_
   * are not enumerable.
   *
   * @param  {mixed} obj
   * @param  {hash} props
   * @api public
   */
  
  extend: function(obj, props) {
    Object.getOwnPropertyNames(props).forEach(function(prop){
      var descriptor = Object.getOwnPropertyDescriptor(props, prop)
      descriptor.enumerable = false
      Object.defineProperty(obj, prop, descriptor)
    })
  },
  
  /**
   * Description
   *
   * @param  {Type} Var
   * @return {Type}
   * @api public
   */
  
  warn: function(msg) {
    process.stdio.writeError('Warning: ' + msg + '\n')
  }
}

require('ext/core_ext')
require('ext/md5')
require('ext/base64')
global.merge(require('ext/printf'))

