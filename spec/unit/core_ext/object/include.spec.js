describe 'Object'
  describe '#include()'
    before_each
      target = {}
    end

    it 'should support setters/getters'
      var source = {
        _foo:'a',
        get foo() { return this._foo },
        set foo(value) { this._foo = "did set to " + value }
      }
      target.include(source)
      target._foo = 'b'
      source.foo.should.eql 'a'
      target.foo.should.eql 'b'
      target.foo = 'c'
      target.foo.should.eql 'did set to c'
    end

    it 'should support read-only properties'
      var source = { get foo() { return 'bar' } }
      target.include(source)
      target.foo.should.eql 'bar'
    end

    it 'should support read-only properties returning objects while deep-copying'
      var source = { get foo() { return { a: 1 } } }
      target.include(true, source)
      target.foo.should.eql { a: 1 }
    end

    it 'should support including self'
      target.include(target).should.eql target
    end

    it 'should support basic coping'
      { first: 'tj' }.include({ last: 'holowaychuk' }).should.eql { first: 'tj', last: 'holowaychuk' }
    end

    it 'should support multiple arguments'
      { a: 1 }.include({ b: 2 }, { c: 3 }).should.eql { a: 1, b: 2, c: 3 }
    end

    it 'should support deep copies'
      var withFirstAndLast = { user: { names: { first: 'tj', last: 'holowaychuk' }}}
      var withFirst = { user: { names: { first: 'tj' }}}
      var withLast = { user: { names: { last: 'holowaychuk' }}}
      withFirst.include(true, withLast).should.eql withFirstAndLast
    end

    it 'should have a left-to-right precedence'
      { awesome: 'no' }.include(false, { awesome: 'nonono' }, { awesome: 'yes' }).should.eql { awesome: 'yes' }
    end

    it 'should require filename'
      target.include('ext/md5')
      target.hash.should.be_type 'function'
      target.hash.should.eql require('ext/md5').hash
    end
  end
end

describe 'GLOBAL'
  describe '#include'
    it 'should be available'
      GLOBAL.include.should.eql Object.prototype.include
    end

    it 'should include properties globally'
      GLOBAL.include({ xxx: 42 })
      GLOBAL.xxx.should.eql 42
      delete GLOBAL.xxx
    end
  end
end
