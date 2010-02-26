
parse = require('ext/date').parse

describe 'date'
  describe 'parse()'
    describe '<day>'
      it 'should work with "monday"'
        parse('monday').day.should.eql 1
      end
      
      it 'should work with "tuesday"'
        parse('tuesday').day.should.eql 2
      end
      
      it 'should work with "wednesday"'
        parse('wednesday').day.should.eql 3
      end
      
      it 'should work with "thursday"'
        parse('thursday').day.should.eql 4
      end
      
      it 'should work with "friday"'
        parse('friday').day.should.eql 5
      end
      
      it 'should work with "saturday"'
        parse('saturday').day.should.eql 6
      end
      
      it 'should work with "sunday"'
        parse('sunday').day.should.eql 0
      end
    end
    
    describe 'next <day>'
      describe 'given a <day>'
        it 'should work'
          parse('next thursday').day.should.eql 4
        end
      end
      
      describe 'omitting <day>'
        it 'should throw an error'
          -{ parse('next') }.should.throw_error(/expected day after next/)
          -{ parse('next next') }.should.throw_error(/expected day after next/)
        end
      end
    end
    
  end
end