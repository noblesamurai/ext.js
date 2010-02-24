
describe 'Number'
  describe '#currency'
    describe 'given an integer'
      it 'should return a currency formatted string'
        (1).currency.should.eql '1'
        (1000).currency.should.eql '1,000'
        (100000).currency.should.eql '100,000'
        (1000000).currency.should.eql '1,000,000'
      end
    end

    describe 'given a float'
      it 'should return a currency formatted string as a float'
        (1.12).currency.should.eql '1.12'
        (1000.1).currency.should.eql '1,000.1'
        (100000.99).currency.should.eql '100,000.99'
        (1000000.55).currency.should.eql '1,000,000.55'
      end
    end
  end

  describe '#ordinalize'
    describe 'given an integer'
      it 'should return an ordinal string'
        (1).ordinalize.should.eql '1st'
        (2).ordinalize.should.eql '2nd'
        (3).ordinalize.should.eql '3rd'
        (4).ordinalize.should.eql '4th'
        (113).ordinalize.should.eql '113th'
        (1003).ordinalize.should.eql '1003rd'
      end
    end
  end
end

