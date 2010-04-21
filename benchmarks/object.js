
var n = 40000
exports.n = n

exports['null'] = function(){
  for (var i = 0; i < n; ++i)
    ;
}

var o = {}

exports['Object#keys'] = function(){
  for (var i = 0; i < n; ++i) {
    o.foo = 'bar'
    o.foo
    o.bar = 'baz'
    o.bar
    o.keys
  }
}

var o = {}

exports['Object.keys()'] = function(){
  for (var i = 0; i < n; ++i) {
    o.foo = 'bar'
    o.foo
    o.bar = 'baz'
    o.bar
    Object.keys(o)
  }
}

var a = { foo: 'bar' },
    b = {},
    i = 40

while (i--)
  b[i] = i

exports['Object#merge()'] = function(){
  for (var i = 0; i < n; ++i) {
    a.merge(b)
  }
}
