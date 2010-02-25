
// ext.js - String - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

//
// --- Extensions
//
Ext.extend(String.prototype, {

  /**
   * Capitalize the given _str_, optionally _all_ words.
   *
   *   'hello there'.capitalize()
   *    // => 'Hello there'
   *
   *   'hello there'.capitalize('all') // or true
   *    // => 'Hello There'
   *
   * @param  {bool} all
   * @return {string}
   * @api public
   */
  capitalize: function (all) {
    return this.split(/\s+/).map(function(word, i){
      return (i === 0 || all) ?
        word.charAt(0).uppercase + word.drop(1) :
          word
    }).join(' ')
  },

  /**
   * Return lowercase string.
   *
   *   'HELLO'.lowercase
   *    // => 'hello'
   *
   * @return {string}
   * @api public
   */

  get lowercase() { return this.toLowerCase() },

  /**
   * Return uppercase string.
   *
   *   'hello'.uppercase
   *    // => 'HELLO'
   *
   * @return {string}
   * @api public
   */

  get uppercase() { return this.toUpperCase() },

  /**
   * Convert to camel-case.
   *
   *   'hello there'.camelcase
   *   // => 'HelloThere'
   *
   * @return {string}
   * @api public
   */

  get camelcase() {
    return this.replace(/[^a-zA-Z0-9 ]+/g, ' ').capitalize(true).remove(/ +/g)
  },

  /**
   * Convert to camel-case.
   *
   *   'hello there'.camelcase
   *   // => 'HelloThere'
   *
   * @return {string}
   * @api public
   */

  get digitize() { return this.remove(/[^\d]/g) }

})

