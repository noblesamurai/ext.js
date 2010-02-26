
// ext.js - Date - Parser - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Valid days.
 */
 
var days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday']

/**
 * Valid quantifiers.
 */

var quantifiers = [
  'second',
  'seconds',
  'minute',
  'minutes',
  'hour',
  'hours',
  'day',
  'days',
  'week',
  'weeks',
  'month',
  'months',
  'year',
  'years']

// --- Lexer

/**
 * Grammar tokens.
 */

var tokens = [
  ['space', /^[\n\t ]+/, false],
  ['int', /^(\d+)/],
  ['in', /^in/],
  ['today', /^today/],
  ['next', /^next/],
  ['yesterday', /^yesterday/],
  ['quantifier', /^(seconds?|minutes?|hours?|days?|weeks?|months?|years?)/],
  ['day', /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/]
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
  this.input = str.lowercase
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
      this.nextDay()
      break
    case 'next':
      this.advance()
      this.expect('day')
      this.nextDay()
      break
    case 'yesterday':
      this.advance()
      this.now.setDate(this.now.date - 1)
      break
    case 'in':
      this.advance()
      var n = parseInt(this.expect('int').val)
      var ms = n[this.expect('quantifier').val] * 1000
      this.now = new Date(Number(this.now) + ms)
  }
  return this.now
}

Parser.prototype.nextDay = function() {
  var i = days.indexOf(this.current.val)
  this.now.setDate(1 + i + (this.now.date + (7 - this.now.day)))
}

exports.parse = function(str, date) {
  return (new Parser(str, date)).parse()
}
