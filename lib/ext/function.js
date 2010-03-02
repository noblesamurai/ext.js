
// ext.js - Function - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

Ext.extend(Function.prototype, {

  /**
   * Bind this function to the given _context_ object.
   *
   * @param  {mixed} context
   * @return {function}
   * @api public
   */

  bind: function(context) {
    var self = this
    return function(){
      return self.apply(context, arguments)
    }
  }
})
