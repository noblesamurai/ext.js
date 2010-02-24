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
  end
end
