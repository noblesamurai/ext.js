
describe 'Object'
  describe '#clone'
    it 'should return a copy'
      var a = { foo: 'bar' }
      var b = a.clone
      a.should.not.equal b
      b.should.have_property 'foo', 'bar'
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

  describe '#tap'
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

  describe '#merge'
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

    it 'should give the object receiving the merge precendence if `reverse` is true'
      var source = { foo: 'bar' }
      var target = { foo: false }
      target.merge(source, true)
      target.foo.should.be_false
    end
  end

  describe '#respondsTo'
    it 'should return true if the object responds to the given key'
      { f: function () {} }.respondsTo('f').should.be_true
    end

    it 'should return false if the object does not respond to the given key'
      {}.respondsTo('f').should.be_false
    end
  end
end

