
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

  describe '#extract()'
    it 'should extract options from the given indexed object'
      var obj = {0: 'a', 1: 'b', 2: {test: 'a'}, length: 3}
      obj.extract().test.should.eql 'a'
      obj.length.should.eql 2
      obj[2].should.be_undefined
    end

    it 'should return an empty object if no options hash is found'
      var obj = {0: 'a', 1: 'b', length: 2}
      obj.extract().should.eql {}
      obj.length.should.eql 2
    end

    it 'should return the options hash from the given index'
      var obj = {0: 'a', 1: {test: 'a'}, 2: 'b', length: 3}
      obj.extract(1).test.should.eql 'a'
      obj.length.should.eql 2
      obj[1].should.eql 'b'
    end

    it 'should return an empty object if no options hash is found at the given index'
      var obj = {0: 'a', 1: 'b', 2: 'c', length: 3}
      obj.extract(1).should.eql {}
      obj.length.should.eql 3
      obj[1].should.not.be_undefined
    end

    it 'should return an empty object if the object is not an indexed object'
      {foo: 'bar'}.extract().should.eql {}
      {foo: 'bar'}.extract(42).should.eql {}
    end

    it 'should support named keys'
      var obj = {options: {foo: 'bar'}}
      obj.extract('options').foo.should.eql 'bar'
      obj.options.should.be_undefined
    end
  end
end

