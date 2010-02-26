
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
  ['space', /^[\n\t ]+/, false],
  ['next', /^next/],
  ['day', /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/],
]

/**
 * Tokenize the given _str_.
 *
 * @param  {string} str
 * @return {array}
 * @api private
 */

function tokenize(str) {
  var stack = []
  while (str.length)
    tokens.detect(function(token){
      if (str.match(token[1])) {
        if (token[2] !== false)
          stack.push({ type: token[0], val: RegExp.$1 })
        str = str.remove(token[1])
        return true
      }
    }) || Error.raise('SyntaxError', 'near "' + str + '"')
  return stack
}

// --- Parser

function Parser(str, date) {
  this.input = str
  this.tokens = tokenize(str)
  this.now = date || new Date
}

Parser.prototype.peek = function() {
  return this.tokens[0]
}

Parser.prototype.advance = function() {
  return this.current = this.tokens.shift()
}

Parser.prototype.accept = function(type) {
  if (this.peek() && this.peek().type === type)
    return this.advance()
}

Parser.prototype.expect = function(type) {
  var token = this.accept(type)
  if (!token) Error.raise('ParseError', 'expected ' + type + ' after ' + this.current.type)
  return token
}

Parser.prototype.parse = function() {
  switch (this.peek().type) {
    case 'day':
      this.advance()
      this.parseDay()
      break
    case 'next':
      this.advance()
      this.expect('day')
      this.parseDay()
  }
  return this.now
}

Parser.prototype.parseDay = function() {
  var i = days.indexOf(this.current.val)
  this.now.setDate(1 + i + (this.now.date + (7 - this.now.day)))
}

exports.parse = function(str) {
  return (new Parser(str)).parse()
}
