describe 'Array'
  describe '#each()'
    it 'should be an alias of #forEach()'
      Array.prototype.each.should.equal Array.prototype.forEach
    end
  end

  describe '#includes()'
    it 'should indicate whether an array contains an item'
      ['test'].includes('test').should.be_true
      ['test'].includes('ok').should.be_false
    end

    it 'should indicate whether an array contains any of the items in a given array'
      [1,2,3,4,5].includes([1,2,3,4,5]).should.be_true
      [1,2,3,4,5].includes([1,2,3,4,5,6]).should.be_false
    end
    
    it 'should work with multiple arguments'
      ['foo', 'bar'].includes('foo', 'bar').should.be_true
      ['foo', 'bar'].includes('bar', 'foo').should.be_true
      ['foo', 'bar'].includes('bar', 'nope').should.be_false
      ['foo', 'bar'].includes('nope', 'foo').should.be_false
      ['foo', 'bar'].includes('foo', 'nope').should.be_false
      ['foo', 'bar'].includes('nope', 'bar').should.be_false
    end
  end

  describe '#first'
    it 'should equal the first element of the array'
      [1,2,3].first.should.equal 1
    end

    it 'should be possible to assign the value'
      a = [1,2,3]
      a.first = 4
      a[0].should.eql 4
    end
  end

  describe '#last'
    it 'should equal the last element of the array'
      [1,2,3].last.should.equal 3
    end

    it 'should be possible to assign the value'
      a = [1,2,3]
      a.last = 4
      a[2].should.eql 4
    end
  end

  describe '#compact()'
    it 'should remove null elements from an array'
      [null,1,2,3,4].compact().should.eql [1,2,3,4]
    end

    it 'should remove undefined elements from an array'
      [undefined,1,2,3,4].compact().should.eql [1,2,3,4]
    end

    it 'should keep null elements if true is passed as its argument'
      [null,undefined,1,2,3,4].compact(true).should.eql [null,1,2,3,4]
    end
  end

  describe '#flatten'
    it 'should flatten the array'
      [1,[2,[3]]].flatten.should.eql [1,2,3]
    end
  end
end
