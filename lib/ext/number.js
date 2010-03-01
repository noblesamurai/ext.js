
// ext.js - Number - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

Ext.extend(Number.prototype, {

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
    n.first = n.first.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
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

  /**
   * Executes the given function n times with optional _context_.
   *
   *  (3).times(function(){ })
   *  (5).times(function(){ }, this)
   *
   * @param  {function} fn
   * @param  {mixed} context
   * @api public
   */

  times: function (fn, context) {
    var times = this
    while (times--) fn.call(context || this)
  },

  /**
   * Check if this number is a float.
   *
   *  (3.14159265).isFloat
   *  // => true
   *
   *  (42).isFloat
   *  // => false
   *
   * @return {bool}
   * @api public
   */

  get isFloat() {
    return this.toString().indexOf('.') !== -1
  },

  /**
   * Return n seconds.
   *
   * @return {number}
   * @api public
   */

  get second() { return this },
  get seconds() { return this },

  /**
   * Return n minutes in seconds.
   *
   * @return {number}
   * @api public
   */

  get minute() { return this * 60 },
  get minutes() { return this * 60 },

  /**
   * Return n hours in seconds.
   *
   * @return {number}
   * @api public
   */

  get hour() { return this * 3600 },
  get hours() { return this * 3600 },

  /**
   * Return n days in seconds.
   *
   * @return {number}
   * @api public
   */

  get day() { return this * 86400 },
  get days() { return this * 86400 },

  /**
   * Return n weeks in seconds.
   *
   * @return {number}
   * @api public
   */

  get week() { return this * 604800 },
  get weeks() { return this * 604800 },

  /**
   * Return n months in seconds.
   *
   * @return {number}
   * @api public
   */

  get month() { return this * 2592000 },
  get months() { return this * 2592000 },

  /**
   * Return n years in seconds.
   *
   * @return {number}
   * @api public
   */

  get year() { return this * 31471200 },
  get years() { return this * 31471200 },
})

