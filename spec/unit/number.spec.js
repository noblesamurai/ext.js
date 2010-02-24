
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

  describe '#ago'
    it 'should return a previous Date in time'
      var seconds = (Number(new Date) - Number((3).minutes.ago)) / 1000
      seconds.should.eql 180
    end
  end

  describe '#times()'
    it 'should invoke the given method n times'
      var i = 0;
      (5).times(function () { i++ })
      i.should.eql 5
    end
  end

  describe '#isFloat'
    it 'should indicate whether the number is a float'
      (1.5).isFloat.should.be_true
      (3.14159265).isFloat.should.be_true
      (42).isFloat.should.be_false
    end
  end
end
