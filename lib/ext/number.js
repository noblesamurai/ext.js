
// ext.js - Number - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

//
// --- Extensions
//
var extensions = {
  /**
   * Convert a the given number _n_ to an ordinal string used to denote the
   * position in an ordered sequence such as 1st, 2nd, 3rd, 4th, etc.
   *
   * @return {string}
   * @api public
   */
  get ordinalize() {
    if ([11, 12, 13].indexOf(this % 100) !== -1)
      return this + 'th'
    else
      switch (this % 10) {
        case 1:  return this + 'st'
        case 2:  return this + 'nd'
        case 3:  return this + 'rd'
        default: return this + 'th'
      }
  },
  /**
   * Return a currency formatted string based on the given number _n_.
   *
   *  (1000.99).currency
   *  // => '1,000.99'
   *
   * @return {string}
   * @api public
   */
  get currency() {
    var n = this.toString().split('.')
    n[0] = n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    return n.join('.')
  },
  /**
   * Convert seconds to minutes.
   *
   * @return {number}
   * @api public
   */
  get toMinutes() { return this / (1).minute },
  /**
   * Convert seconds to hours.
   *
   * @return {number}
   * @api public
   */
  get toHours() { return this / (1).hour },
  /**
   * Convert seconds to days.
   *
   * @return {number}
   * @api public
   */
  get toDays() { return this / (1).day },
  /**
   * Convert seconds to weeks.
   *
   * @return {number}
   * @api public
   */
  get toWeeks() { return this / (1).week },
  /**
   * Convert seconds to months.
   *
   * @return {number}
   * @api public
   */
  get toMonths() { return this / (1).month },
  /**
   * Convert seconds to years.
   *
   * @return {number}
   * @api public
   */
  get toYears() { return this / (1).year },
  /**
   * Return a new Date representing n seconds ago.
   *
   *  (5).minutes.ago
   *  // => Date
   *
   * @return {Date}
   * @api public
   */
  get ago() {
    return new Date(Number(new Date) - this * 1000)
  },
  get second() { return this },
  get seconds() { return this },
  /**
   * Executes the given function n times within the additionally given scope.
   *
   *  (5).times(function() { }, this)
   *
   * @api public
   */
  times: function (fn, scope) {
    var times = this
    scope     = scope || this
    while (times--) fn.call(scope)
  }
}

// --- Seconds

/**
 * Return n seconds.
 *
 * @return {number}
 * @api public
 */

var seconds =  function(){ return this }
extensions.__defineGetter__('seconds', seconds)
extensions.__defineGetter__('second', seconds)

/**
 * Return n minutes in seconds.
 *
 * @return {number}
 * @api public
 */

var minutes =  function(){ return this * 60 }
extensions.__defineGetter__('minutes', minutes)
extensions.__defineGetter__('minute', minutes)

/**
 * Return n hours in seconds.
 *
 * @return {number}
 * @api public
 */

var hours =  function(){ return this * 3600 }
extensions.__defineGetter__('hours', hours)
extensions.__defineGetter__('hour', hours)

/**
 * Return n days in seconds.
 *
 * @return {number}
 * @api public
 */

var days =  function(){ return this * 86400 }
extensions.__defineGetter__('days', days)
extensions.__defineGetter__('day', days)


/**
 * Return n weeks in seconds.
 *
 * @return {number}
 * @api public
 */

var weeks =  function(){ return this * 604800 }
extensions.__defineGetter__('weeks', weeks)
extensions.__defineGetter__('week', weeks)

/**
 * Return n months in seconds.
 *
 * @return {number}
 * @api public
 */

var months =  function(){ return this * 2592000 }
extensions.__defineGetter__('months', months)
extensions.__defineGetter__('month', months)

/**
 * Return n years in seconds.
 *
 * @return {number}
 * @api public
 */

var years =  function(){ return this * 31471200 }
extensions.__defineGetter__('years', years)
extensions.__defineGetter__('year', years)

Object.getOwnPropertyNames(extensions).forEach(function (property) {
  var descriptor = Object.getOwnPropertyDescriptor(extensions, property)
  descriptor.enumerable = false
  Object.defineProperty(Number.prototype, property, descriptor)
})

