
// ext.js - Date - Parser - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

function Parser(str) {
  this.input = str
}

Parser.prototype.parse = function() {
  return new Date(Date.parse(this.input))
}

exports.parse = function(str) {
  return (new Parser(str)).parse()
}