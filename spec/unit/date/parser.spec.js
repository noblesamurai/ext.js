
parse = require('ext/date').parse

describe 'date'
  describe 'parse()'
    describe 'month day, year'
      it 'should work'
        var date = parse('July 5, 2005')
        date.monthName.should.eql 'July'
        date.date.should.eql 5
        date.year.should.eql 2005
      end
    end
  end
end