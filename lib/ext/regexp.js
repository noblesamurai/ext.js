/**
 * Escapes the given string to be used as the source for a RegExp.
 *
 *  RegExp.escape('[\\w]+')
 *  // => '\[\\w\]\+'
 *
 * @param {string} str
 * @api public
 */
Object.defineProperty(RegExp, 'escape', {
  value: function (str) {
    return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1')
  },
  enumerable: false
});
