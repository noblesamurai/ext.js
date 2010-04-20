
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
    return this.reduce(function(sum, n){ return sum + n })
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
    return this.reduce(function(min, n){
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
    return this.reduce(function(max, n){
      return n > max ? n : max
    })
  }
})
