
require.paths.unshift(__dirname + '/../lib')
require('ext')

var path = process.argv[2],
    benchmarks = require(__dirname + '/' + path)


printf('\n  benchmarking %s\n\n', path)

benchmarks.each(function(fn, label){
  var start = +new Date
  fn()
  var duration = (+new Date - start) / 1000
  printf('%25s : %0.3f\n', label, duration)
})
