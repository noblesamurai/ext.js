
var n = 400000,
    array = []

while (n--)
  array.push(n)

exports['array for loop'] = function(){
  for (var i = 0; i < array.length; ++i)
    ;
}

exports['array for loop cached'] = function(){
  for (var i = 0, len = array.length; i < len; ++i)
    ;
}
  
exports['array#each()'] = function(){
  array.each(function(){})
}

exports['array#remove()'] = function(){
  array.remove(5)
}