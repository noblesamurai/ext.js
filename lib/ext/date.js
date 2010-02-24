
// ext.js - Date - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Module dependencies.
 */

var number = require('ext/number')

/**
 * Month names.
 */

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December']

/**
 * Day names.
 */

var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday']

// --- Extensions

process.mixin(Date.prototype, {
  /**
   * Shortcuts for getMETHOD
   */
  get milliseconds() { return this.getMilliseconds() },
  get seconds()      { return this.getSeconds() },
  get minutes()      { return this.getMinutes() },
  get hours()        { return this.getHours() },
  get date()         { return this.getDate() },
  get day()          { return this.getDay() },
  get month()        { return this.getMonth() },
  get year()         { return this.getFullYear() },
  /**
   * Return month name string.
   *
   * @return {string}
   * @api public
   */
  get monthName() { return months[this.month] },
  /**
   * Return 3 character month name string.
   *
   * @return {string}
   * @api public
   */
  get shortMonthName () { return months[this.month].substr(0, 3) },
  /**
   * Return day name string.
   *
   * @return {string}
   * @api public
   */
  get dayName() { return days[this.day] },
  /**
   * Return 3 character day name string.
   *
   * @return {string}
   * @api public
   */
  get shortDayName() { return days[this.day].substr(0, 3) },
  /**
   * Format date using the given _str_ using the
   * following format syntax:
   *
   *  % [flag]specifier
   *
   *  Flags:
   *    - n  Passes numeric value through ordinalize() to produce '12th', '3rd', etc
   *
   *  Specifiers:
   *    - a  Short weekday name ('Mon')
   *    - A  Full weekday name ('Monday')
   *    - b  Short month name ('Jan')
   *    - B  Full month name ('January')
   *    - e  Day number (12)
   *    - p  AM / PM
   *    - P  am / pm
   *    - S  Seconds (34)
   *    - d  Day with leading zero (01, 30)
   *    - m  Month with leading zero (01, 12)
   *    - M  Minutes with leading zero (01, 60)
   *    - H  Hours with leading zero (01, 24)
   *    - Y  Year with century (2010)
   *
   * @param  {string} str
   * @return {string}
   * @api public
   */
  format: function(str) {
    var val, self = this
    function pad(n){ return n < 10 ? '0' + n : n }
    return str.replace(/%(\w)?(\w)/g, function(_, flag, specifier){
      val = (function(){
        switch (specifier) {
          case 'a': return self.shortDayName
          case 'A': return self.dayName
          case 'b': return self.shortMonthName
          case 'B': return self.monthName
          case 'd': return pad(self.date)
          case 'e': return self.date
          case 'P': return self.hours > 11 ? 'pm' : 'am'
          case 'p': return self.hours > 11 ? 'PM' : 'AM'
          case 'S': return pad(self.seconds)
          case 'm': return pad(self.month + 1)
          case 'M': return pad(self.minutes)
          case 'H': return pad(self.hours)
          case 'Y': return pad(self.year)
        }
      })()
      return flag === 'n' ? val.ordinalize : val
    })
  },
  /**
   * Return this date in words since the given _date_.
   *
   *  'completed ' + (5).days.ago.inWordsSince(new Date) + ' ago'
   *  // => "completed 5 days ago"
   *
   * @param  {Date} date
   * @return {string}
   * @api public
   */
  inWordsSince: function(date) {
    if (this > date) return
    var seconds = (Number(date) - Number(this)) / 1000
    if (seconds < 60)
      return 'less than one minute'
    else if (seconds < (60).minutes)
      return seconds.toMinutes === 1 
        ? 'one minute'
        : seconds.toMinutes + ' minutes'
    else if (seconds < (24).hours)
      return seconds.toHours === 1
        ? 'one hour'
        : seconds.toHours + ' hours'
    else if (seconds < (7).days)
      return seconds.toDays === 1
        ? 'one day'
        : seconds.toDays + ' days'
    else if (seconds < (4).weeks)
      return seconds.toWeeks === 1
        ? 'one week'
        : seconds.toWeeks + ' weeks'
    else if (seconds < (12).months)
      return seconds.toMonths === 1
        ? 'one month'
        : seconds.toMonths + ' months'
    else if (seconds < (99).years)
      return seconds.toYears === 1
        ? 'one year'
        : seconds.toYears + ' years'
  }
})
