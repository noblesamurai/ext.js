
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

exports['array#select()'] = function(){
  array.select(function(n){ return n < 100 })
}

exports['array#reject()'] = function(){
  array.reject(function(n){ return n < 100 })
}

exports['array#find()'] = function(){
  array.find(function(n){ return n > 10000 })
}

exports['array#all()'] = function(){
  array.all(function(n){ return n > 10000 })
}

