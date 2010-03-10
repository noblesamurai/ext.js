describe 'Array'
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

