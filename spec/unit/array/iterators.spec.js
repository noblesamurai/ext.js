describe 'Array'
  describe 'shorthand function syntax'
    describe 'when given binary operators'
      it 'should evaluate against the first argument'
        1..10.select('> 5').should.eql 6..10
      end
    end

    describe 'when given a property name is given'
      it 'should access the property on the first argument'
        ['foo', 'bar'].map('length').should.eql [3,3]
      end
    end

    describe 'when given a method name'
      it 'should call the method on the first argument'
        [1,2].map('toString()').should.eql ['1', '2']
      end
    end

    describe 'when given large strings'
      it 'should be a return expression'
        [1,2,6].map('a > 5 ? true : false').should.eql [false, false, true]
      end
    end
  end

  describe '#detect()'
    it 'should return the first element the given function returns true for'
      1..4.detect(function (e) { return e === 3 }).should.eql 3
    end

    it 'should return undefined if the given function never returns true'
      1..4.detect(function(){}).should.be_undefined
    end

    it 'should accept optional context'
      var obj = { foo: function(){ return true }}
      obj.should.receive('foo', 'once')
      1..4.detect(function(){ return this.foo() }, obj).should.eql 1
    end

    it 'should allow shorthand function syntax'
      1..4.detect('=== 3').should.eql 3
    end
  end

  describe '#each()'
    it 'should be an alias of #forEach()'
      Array.prototype.each.should.equal Array.prototype.forEach
    end

    it 'should pass val as the first argument'
      var vals = [];
      1..4.each(function(val){ vals.push(val) })
      vals.should.eql 1..4
    end

    it 'should pass index as the second argument'
      var vals = [];
      1..4.each(function(val, i){ vals.push(i) })
      vals.should.eql 0..3
    end

    it 'should pass _this_ as the third argument'
      var result;
      1..4.each(function(val, i, thisp){ result = thisp })
      result.should.eql 1..4
    end
  end

  describe '#reduce()'
    it 'should iterate with memo object'
      var evens = 1..10.reduce([], function(evens, n){
        if (n % 2 === 0) evens.push(n)
        return evens
      })
      evens.should.eql [2,4,6,8,10]
    end

    it 'should allow optional context'
      var obj = { foo: 'bar' }
      1..3.reduce([], function(){ return this.foo }, obj).should.eql 'bar'
    end

    it 'should work with shorthand function syntax'
      1..5.reduce(0, 'a + b').should.eql 15
    end

    it 'should be ECMAScript compliant'
      0..3.reduce(function(a, b) { return a + b }).should.eql 6
      [[0,1], [2,3], [4,5]].reduce(function(a, b) { return a.concat(b) }, []).should.eql 0..5
    end
  end

  describe '#select()'
    it 'should collect values when truthy'
      var evens = 1..10.select(function(n){ return n % 2 === 0 })
      evens.should.eql [2,4,6,8,10]
    end

    it 'should allow optional context'
      var obj = { foo: function(){}}
      obj.should.receive('foo', 'twice')
      ;[1,2].select(function(){ return this.foo() }, obj)
    end

    it 'should work with shorthand function syntax'
      1..10.select('a % 2 === 0').should.eql [2,4,6,8,10]
    end
  end

  describe '#reject()'
    it 'should reject values when truthy'
      var odds = 1..10.reject(function(n){ return n % 2 === 0 })
      odds.should.eql [1,3,5,7,9]
    end

    it 'should allow optional context'
      var obj = { foo: function(){}}
      obj.should.receive('foo', 'twice')
      ;[1,2].reject(function(){ return this.foo() }, obj)
    end

    it 'should work with shorthand function syntax'
      1..10.reject('a % 2 === 0').should.eql [1,3,5,7,9]
    end
  end

  describe '#map()'
    it 'should return values returned by the given callback'
      1..3.map(function(n){ return ++n }).should.eql [2,3,4]
    end

    it 'should allow optional context'
      var obj = { foo: 'bar' }
      1..3.map(function(){ return this.foo }, obj).should.eql ['bar', 'bar', 'bar']
    end

    it 'should work with shorthand function syntax'
      ['foo', 'bar'].map('length').should.eql [3,3]
    end

    it 'should be ECMAScript compliant'
      var obj = { incr: 1 }, args
      1..3.map(function (value) {  args = arguments; return value + this.incr }, obj).should.eql 2..4
      args[0].should.eql 3
      args[1].should.eql 2
      args[2].should.eql 1..3
    end
  end

  describe '#some()'
    it 'should return true if any evaluate to true'
      [4,6,4,1,2].some(function(n){ return n > 5 }).should.be_true
    end

    it 'should return false when none evaluate to true'
      1..5.some(function(n){ return n > 5 }).should.be_false
    end

    it 'should allow optional context'
      var obj = { foo: function(){}}
      obj.should.receive('foo', 'twice')
      ;[1,2].some(function(){ return this.foo() }, obj)
    end

    it 'should work with shorthand function syntax'
      1..5.some('a == 4').should.be_true
    end
  end

  describe '#none()'
    it 'should return true if none evaluate to true'
      1..5.none(function(n){ return n > 5 }).should.be_true
    end

    it 'should return false when any evaluate to true'
      1..10.none(function(n){ return n > 5 }).should.be_false
    end

    it 'should allow optional context'
      var obj = { foo: function(){}}
      obj.should.receive('foo', 'twice')
      ;[1,2].none(function(){ return this.foo() }, obj)
    end

    it 'should work with shorthand function syntax'
      1..10.none('a > 5').should.be_false
    end
  end
end

