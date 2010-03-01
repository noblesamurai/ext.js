
// ext.js - Array - Collections - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

Ext.extend(Array.prototype, {

  /**
   * Return sum of values.
   *
   *  [1,2,3,4,5].sum
   *  // => 15
   *
   * @return {number}
   * @api public
   */

  get sum() {
    return this.reduce(0, 'a + b')
  },

  /**
   * Return average of values.
   *
   *  [1,2,3,4,5].avg
   *  // => 5
   *
   * @return {number}
   * @api public
   */

  get avg() {
    return this.sum / this.length
  },

  /**
   * Return lowest value.
   *
   * @return {number}
   * @api public
   */

  get min() {
    return this.reduce(this.first, function(min, n){
      return n < min ? n : min
    })
  },

  /**
   * Return largest value.
   *
   * @return {number}
   * @api public
   */

  get max() {
    return this.reduce(this.first, function(max, n){
      return n > max ? n : max
    })
  }

})

