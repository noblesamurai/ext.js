describe 'Array'
  describe '#each()'
    it 'should be an alias of #forEach()'
      Array.prototype.each.should.equal Array.prototype.forEach
    end
  end
end
