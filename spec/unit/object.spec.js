
describe 'Object'
  describe '.prototype enumerables'
    it 'should have none'
      // Comparing to the array instead of length will show us what exactly
      // is enumerable in case the spec fails.
      Object.keys(Object.prototype).should.eql []
    end
  end

  describe '#alias()'
    it 'should alias the given method'
      obj = { foo: function () {} }
      obj.alias('fooWithFeature', 'foo')
      obj.fooWithFeature.should.equal obj.foo
    end

    it 'should support passing a source object'
      obj    = {}
      source = { foo: function () {} }
      obj.alias('fooWithFeature', 'foo', source)
      obj.fooWithFeature.should.equal source.foo
    end
  end

  describe '#aliasMethodChain()'
    it 'should extend the method with the given feature'
      obj = { foo: function () {}, fooWithFeature: function () { return 'feature' } }
      foo = obj.foo
      obj.aliasMethodChain('foo', 'feature')
      obj.fooWithoutFeature.should.eql foo
      obj.foo.should.equal obj.fooWithFeature
    end

    it 'should be possible to specify an additional object to pull the features from'
      obj            = { foo: function () {} }
      foo            = obj.foo
      objWithFeature = { fooWithFeature: function () {return 'feature'} }

      obj.aliasMethodChain('foo', 'feature', objWithFeature)
      obj.fooWithoutFeature.should.eql foo
    end
  end
end

