describe 'Object'
  describe '.prototype enumerables'
    it 'should have none'
      // Comparing to the array instead of length will show us what exactly
      // is enumerable in case the spec fails.
      Object.keys(Object.prototype).should.eql []
    end
  end
end
