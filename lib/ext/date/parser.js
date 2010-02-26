
// ext.js - Date - Parser - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Days.
 */
 
var days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

// --- Lexer

/**
 * Grammar tokens.
 */

var tokens = [
  ['day', /^(monday|tuesday|wednesday|thursday|friday|saturday|friday)/],
]

/**
 * Tokenize the given _str_.
 *
 * @param  {string} str
 * @return {array}
 * @api private
 */

function tokenize(str) {
  return tokens.reduce([], function(stack, token){
    if (str.match(token[1]))
      stack.push({ type: token[0], val: RegExp.$1 }),
      str += str.remove(token[1])
    return stack
  })
}

// --- Parser

function Parser(str) {
  this.input = str
  this.tokens = tokenize(str)
  this.date = new Date
}

Parser.prototype.peek = function() {
  return this.tokens[0]
}

Parser.prototype.advance = function() {
  return this.tokens.shift()
}

Parser.prototype.parse = function() {
  switch (this.peek().type) {
    case 'day':
      this.parseDay()
      break
  }
  return this.date
}

Parser.prototype.parseDay = function() {

}

exports.parse = function(str) {
  return (new Parser(str)).parse()
}