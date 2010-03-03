
var n = 50000,
    array = []

while (n--)
  array.push(n)
  
exports['array#each()'] = function(){
  array.each(function(){})
}

exports['array#remove()'] = function(){
  array.remove(5)
}