
describe 'Object'
  describe '#map()'
    it 'should map the object'
      { foo: 1 }.map(function (x) { return x + 1 }).foo.should.eql 2
    end

    it 'should support a given context'
      var obj = { foo: 41 }
      { foo: 1 }.map(function (x) { return x + this.foo }, obj).foo.should.eql 42
    end

    it 'should pass the arguments in the expected order'
      var obj = { foo: 'bar' }, args
      obj.map(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end
    
    it 'should support short-hand function syntax'
      { foo: 1 }.map('a + 1').foo.should.eql 2
    end
  end

  describe '#each()'
    it 'should iterate the object'
      var obj = { foo: 1, bar: 1, baz: 1}, result = 0
      obj.each(function (x) { result += x })
      result.should.eql 3
    end

    it 'should support a given context'
      var obj = { foo: 1, bar: 1, baz: 1}, result = 0, context = { foo: 1 }
      obj.each(function (x) { result += x + this.foo }, context)
      result.should.eql 6
    end

    it 'should pass the arguments in the expected order'
      var obj = { foo: 'bar' }, args
      obj.each(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end
  end

  describe '#filter()'
    it 'should filter the object'
      {foo: 'bar', foo2: 'baz'}.filter(function (x) { return x === 'bar' }).should.eql {foo: 'bar'}
    end

    it 'should support a given context'
      var obj = { foo: 'bar' }
      {foo: 'bar', foo2: 'baz'}.filter(function (x) { return x === this.foo }, obj).should.eql {foo: 'bar'}
    end

    it 'should pass the arguments in the expected order'
      var obj = { foo: 'bar' }, args
      obj.filter(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end
    
    it 'should be aliased as #select()'
      {}.select.should.equal {}.filter
    end
    
    it 'should support short-hand function syntax'
      { foo: 'bar' }.filter('.length > 3').should.eql {}
    end
  end

  describe '#every()'
    it 'should return true if every satisfies the provided testing function'
      { foo: 'bar', baz: 'bar' }.every(function (x) { return x === 'bar' }).should.be_true
    end

    it 'should return false if at least one property does not satisfy the provided testing function'
      { foo: 'bar', baz: 'baz' }.every(function (x) { return x === 'bar' }).should.be_false
    end

    it 'should support a given context'
      var obj = { foo: 'bar' }
      {foo: 'bar', foo2: 'bar'}.every(function (x) { return x === this.foo }, obj).should.be_true
    end

    it 'should pass the arguments in the expected order'
      var obj = { foo: 'bar' }, args
      obj.every(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end
    
    it 'should be aliased as #all()'
      {}.every.should.equal {}.all
    end
    
    it 'should support short-hand function syntax'
      { foo: 'bar' }.every('=== "bar"').should.be_true
    end
  end

  describe '#some()'
    it 'should return true if at least one property satisfies the provided testing function'
      { foo: 'bar', baz: 'baz' }.some(function (x) { return x === 'bar' }).should.be_true
    end

    it 'should return false if no property satisfies the provided testing function'
      { foo: 'barrr', baz: 'baz' }.some(function (x) { return x === 'bar' }).should.be_false
    end

    it 'should support a given context'
      var obj = { foo: 'bar' }
      {foo: 'bar', bar: 'baz'}.some(function (x) { return x === this.foo }, obj).should.be_true
    end
    
    it 'should pass the arguments in the expected order'
      var obj = { foo: 'bar' }, args
      obj.some(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end
    
    it 'should be aliased as #any()'
      {}.some.should.equal {}.any
    end
    
    it 'should support short-hand function syntax'
      { foo: 'bar' }.some('=== "bar"').should.be_true
    end
  end

  describe '#reject()'
    it 'should return an object containing only the properties the testing function returned false for'
      {foo: 'bar', baz: 'baz'}.reject(function (x) { return x === 'bar' }).should.eql {baz: 'baz'}
    end

    it 'should support a given context'
      var obj = { foo: 'bar' }
      {foo: 'bar', bar: 'baz'}.reject(function (x) { return x === this.foo }, obj).should.eql {bar: 'baz'}
    end

    it 'should pass the arguments in the expected order'
      var obj = { foo: 'bar' }, args
      obj.reject(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end
    
    it 'should support short-hand function syntax'
      { foo: 'bar' }.reject('=== "bar"').should.eql {}
    end
  end
end

