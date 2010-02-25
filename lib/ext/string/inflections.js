
// ext.js - String - Inflections - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

function inflect(str, rules) {
    var match
    if (!uncountables.detect(function (word) { return word === str.lowercase }))
      if (match = rules.detect(function (rule) { return str.match(rule[0]) }))
        return str.replace(match[0], match[1])
    return str;
}

// --- Extensions

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
        word.charAt(0).uppercase + word.drop(1) :
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
   * Returns the plural of the string.
   *
   *   'potato'.plural
   *   // => 'potatoes'
   *
   * @return {string}
   * @api public
   */

  get plural() { return inflect(this, pluralRules) },

  /**
   * Returns the singular of the string.
   *
   *   'potatoes'.singular
   *   // => 'potato'
   *
   * @return {string}
   * @api public
   */

  get singular() { return inflect(this, singularRules) }

})

/**
 * Uncountable words.
 */

var uncountables = [
  'equipment',
  'information',
  'rice',
  'money',
  'species',
  'series',
  'fish',
  'sheep',
  'moose',
  'deer',
  'news'];
  
/**
 * Pluralization rules.
 */

var pluralRules = [
  [new RegExp('(m)an$', 'gi'), '$1en'],
  [new RegExp('(pe)rson$', 'gi'), '$1ople'],
  [new RegExp('(child)$', 'gi'), '$1ren'],
  [new RegExp('^(ox)$', 'gi'), '$1en'],
  [new RegExp('(ax|test)is$', 'gi'), '$1es'],
  [new RegExp('(octop|vir)us$', 'gi'), '$1i'],
  [new RegExp('(alias|status)$', 'gi'), '$1es'],
  [new RegExp('(bu)s$', 'gi'), '$1ses'],
  [new RegExp('(buffal|tomat|potat)o$', 'gi'), '$1oes'],
  [new RegExp('([ti])um$', 'gi'), '$1a'],
  [new RegExp('sis$', 'gi'), 'ses'],
  [new RegExp('(?:([^f])fe|([lr])f)$', 'gi'), '$1$2ves'],
  [new RegExp('(hive)$', 'gi'), '$1s'],
  [new RegExp('([^aeiouy]|qu)y$', 'gi'), '$1ies'],
  [new RegExp('(x|ch|ss|sh)$', 'gi'), '$1es'],
  [new RegExp('(matr|vert|ind)ix|ex$', 'gi'), '$1ices'],
  [new RegExp('([m|l])ouse$', 'gi'), '$1ice'],
  [new RegExp('(quiz)$', 'gi'), '$1zes'],
  [new RegExp('s$', 'gi'), 's'],
  [new RegExp('$', 'gi'), 's']
]

/**
 * Singularization rules.
 */

var singularRules = [
  [new RegExp('(m)en$', 'gi'), '$1an'],
  [new RegExp('(pe)ople$', 'gi'), '$1rson'],
  [new RegExp('(child)ren$', 'gi'), '$1'],
  [new RegExp('([ti])a$', 'gi'), '$1um'],
  [new RegExp(
      '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$',
      'gi'), '$1$2sis'],
  [new RegExp('(hive)s$', 'gi'), '$1'],
  [new RegExp('(tive)s$', 'gi'), '$1'],
  [new RegExp('(curve)s$', 'gi'), '$1'],
  [new RegExp('([lr])ves$', 'gi'), '$1f'],
  [new RegExp('([^fo])ves$', 'gi'), '$1fe'],
  [new RegExp('([^aeiouy]|qu)ies$', 'gi'), '$1y'],
  [new RegExp('(s)eries$', 'gi'), '$1eries'],
  [new RegExp('(m)ovies$', 'gi'), '$1ovie'],
  [new RegExp('(x|ch|ss|sh)es$', 'gi'), '$1'],
  [new RegExp('([m|l])ice$', 'gi'), '$1ouse'],
  [new RegExp('(bus)es$', 'gi'), '$1'],
  [new RegExp('(o)es$', 'gi'), '$1'],
  [new RegExp('(shoe)s$', 'gi'), '$1'],
  [new RegExp('(cris|ax|test)es$', 'gi'), '$1is'],
  [new RegExp('(octop|vir)i$', 'gi'), '$1us'],
  [new RegExp('(alias|status)es$', 'gi'), '$1'],
  [new RegExp('^(ox)en', 'gi'), '$1'],
  [new RegExp('(vert|ind)ices$', 'gi'), '$1ex'],
  [new RegExp('(matr)ices$', 'gi'), '$1ix'],
  [new RegExp('(quiz)zes$', 'gi'), '$1'],
  [new RegExp('s$', 'gi'), '']
]


