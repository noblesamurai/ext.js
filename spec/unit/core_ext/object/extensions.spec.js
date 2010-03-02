
describe 'Object'
  describe '#alias()'
    it 'should copy a property'
      Object.prototype.foo = 'yay'
      {}.foo.should.eql 'yay'
      Object.prototype.alias('foo', 'bar')
      {}.bar.should.eql 'yay'
      {}.bar.should.equal {}.foo
      delete Object.prototype.foo
      delete Object.prototype.bar
    end

    it 'should be chainable'
      Object.prototype.a = 'yay'
      {}.a.should.eql 'yay'
      Object.prototype
        .alias('a', 'b')
        .alias('a', 'c')
        .alias('a', 'd')
      {}.b.should.eql 'yay'
      {}.c.should.eql 'yay'
      {}.d.should.eql 'yay'
      delete Object.prototype.a
      delete Object.prototype.b
      delete Object.prototype.c
      delete Object.prototype.d
    end
  end

  describe '#keys'
    it 'should return own property keys'
      { foo: 'bar', baz: 'raz' }.keys.should.eql ['foo', 'baz']
    end
  end

  describe '#values'
    it 'should return an array containing all the values of an object'
      { foo: 'bar', baz: 'raz' }.values.should.eql ['bar', 'raz']
    end
  end

  describe '#tap()'
    it 'should allow to tap into function call chains'
      var result
      'user_names'.camelcase.tap(function (x) { result = x }).singular.should.eql 'UserName'
      (result == 'UserNames').should.be_true
    end

    it 'should support a given context'
      var result, obj = { foo: 'bar' }
      'user_names'.camelcase.tap(function (x) { result = (x + this.foo) }, obj).singular.should.eql 'UserName'
      result.should.eql 'UserNamesbar'
    end
  end

  describe '#merge()'
    it 'should merge the given object and return _this_'
      var source = { foo: 'bar' }
      var target = {}
      target.merge(source).should.eql target
      target.foo.should.eql 'bar'
    end

    it 'should give the object being merged precendence'
      var source = { foo: 'bar' }
      var target = { foo: 'baz' }
      target.merge(source)
      target.foo.should.eql 'bar'
    end
  end

  describe '#respondsTo()'
    it 'should return true if the object responds to the given key'
      { f: function () {} }.respondsTo('f').should.be_true
    end

    it 'should return true when the object inherits a function'
      ''.respondsTo('toString').should.be_true
    end

    it 'should return false if the object does not respond to the given key'
      {}.respondsTo('f').should.be_false
    end
  end
end

