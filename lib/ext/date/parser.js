
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
  ['number', /^a +/, function(){ return 1 }],
  ['number', /^one/, function(){ return 1 }],
  ['number', /^two/, function(){ return 2 }],
  ['number', /^three/, function(){ return 3 }],
  ['number', /^four +/, function(){ return 4 }],
  ['number', /^five/, function(){ return 5 }],
  ['number', /^six +/, function(){ return 6 }],
  ['number', /^seven +/, function(){ return 7 }],
  ['number', /^eight +/, function(){ return 8 }],
  ['number', /^nine +/, function(){ return 9 }],
  ['number', /^ten/, function(){ return 10 }],
  ['number', /^eleven/, function(){ return 11 }],
  ['number', /^twelve/, function(){ return 12 }],
  ['number', /^thirteen/, function(){ return 13 }],
  ['number', /^fourteen/, function(){ return 14 }],
  ['number', /^fifteen/, function(){ return 15 }],
  ['number', /^sixteen/, function(){ return 16 }],
  ['number', /^seventeen/, function(){ return 17 }],
  ['number', /^eighteen/, function(){ return 18 }],
  ['number', /^nineteen/, function(){ return 19 }],
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
          stack.push({ type: token[0], val: token[2] ? token[2](RegExp.$1) : RegExp.$1 })
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
