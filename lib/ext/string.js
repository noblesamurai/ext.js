
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
        word.charAt(0).uppercase + word.substring(1, word.length) :
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
  
  get digitize() { return this.remove(/[^\d]/g) },
  
  /**
   * Strip leading and trailing whitespace.
   *
   *   '  \n\n foo '.strip
   *   // => 'foo'
   *
   * @return {string}
   * @api public
   */
  
  get strip() { return this.remove(/^\s+|\s+$/g) },
  
  /**
   * Wrap with the given string, or _prefix_ and _suffix_.
   *
   *    'text'.wrap('<p>', '</p>')
   *    // => '<p>text</p>'
   *
   *    'foo'.wrap('...')
   *    // => '...foo...'
   *
   * @param  {string} prefix
   * @param  {string} suffix
   * @return {string}
   * @api public
   */
  
  wrap: function (prefix, suffix) {
    return prefix + this + (suffix || prefix)
  },
  
  /**
   * Check if this string starts with _str_.
   *
   * @param  {string} str
   * @return {bool}
   * @api public
   */
  
  startsWith: function(str) {
    return this.indexOf(str) === 0
  },
  
  /**
   * Check if this string ends with _str_.
   *
   * @param  {string} str
   * @return {bool}
   * @api public
   */
  
  endsWith: function(str) {
    return this.lastIndexOf(str) === this.length - str.length
  },
  
  /**
   * Remove all substrings matching the given _pattern_.
   *
   * @param  {regexp} pattern
   * @return {bool}
   * @api public
   */
  
  remove: function(pattern) {
    return this.replace(pattern, '')
  },
  
  /**
   * Return substring after the first occurrence of _str_.
   *
   * @param  {string} str
   * @return {string}
   * @api public
   */
  
  after: function(str) {
    var i = this.indexOf(str)
    return i === -1 ?  '' : this.substring(i + str.length)
  },
  
  /**
   * Return substring before the first occurrence of _str_.
   *
   * @param  {string} str
   * @return {string}
   * @api public
   */
  
  before: function(str) {
    var i = this.indexOf(str)
    return i === -1 ? '' : this.substring(0, i)
  },
  
  /**
   * Left pad string _width_ with optional _char_,
   * which defaults to a space.
   *
   * @param  {int} width
   * @param  {string} char
   * @return {string}
   * @api public
   */
  
  padLeft: function(width, char) {
    return (new Array(++width - this.length)).join(char || ' ') + this
  },
  
  /**
   * Right pad string _width_ with optional _char_,
   * which defaults to a space.
   *
   * @param  {int} width
   * @param  {string} char
   * @return {string}
   * @api public
   */
  
  padRight: function(width, char) {
    return this + (new Array(++width - this.length)).join(char || ' ')
  }
})
