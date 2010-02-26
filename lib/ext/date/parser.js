
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
  
/**
 * Prefixes.
 */
 
var prefixes = {
  twenty:   20,
  thirty:   30,
  fourty:   40,
  fifty:    50,
  sixty:    60,
  seventy:  70,
  eighty:   80,
  ninety:   90,
  hundred:  100,
  thousand: 1000,
  million:  1000000,
  billion:  1000000000,
  trillion: 1000000000000,
}

// --- Lexer

/**
 * Grammar tokens.
 */

var tokens = [
  ['space', /^[\n\t ]+/, false],
  ['in', /^in/],
  ['today', /^today/],
  ['next', /^next/],
  ['yesterday', /^yesterday/],
  ['quantifier', /^(seconds?|minutes?|hours?|days?|weeks?|months?|years?)/],
  ['day', /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/],
  ['number', /^(\d+)/, function(val){ return parseInt(val) }],
  ['number', /^a +/, 1],
  ['number', /^one/, 1],
  ['number', /^two/, 2],
  ['number', /^three/, 3],
  ['number', /^four +/, 4],
  ['number', /^five/, 5],
  ['number', /^six +/, 6],
  ['number', /^seven +/, 7],
  ['number', /^eight +/, 8],
  ['number', /^nine +/, 9],
  ['number', /^ten/, 10],
  ['number', /^eleven/, 11],
  ['number', /^twelve/, 12],
  ['number', /^thirteen/, 13],
  ['number', /^fourteen/, 14],
  ['number', /^fifteen/, 15],
  ['number', /^sixteen/, 16],
  ['number', /^seventeen/, 17],
  ['number', /^eighteen/, 18],
  ['number', /^nineteen/, 19],
]

/**
 * Tokenize the given _str_.
 *
 * @param  {string} str
 * @return {array}
 * @api private
 */

function tokenize(str) {
  var  stack = []
  while (str.length)
    tokens.detect(function(token){
      if (str.match(token[1])) {
        if (token[2] !== false)
          stack.push({
            type: token[0],
            val: typeof token[2] === 'function'
              ? token[2](RegExp.$1)
              : token[2] === undefined
                ? RegExp.$1
                : token[2]
          })
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
      var n = this.expect('number').val
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
