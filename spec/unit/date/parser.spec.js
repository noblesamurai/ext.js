
parse = require('ext/date').parse

describe 'date'
  describe 'parse()'
    describe '<day>'
      it 'should work like "next <day>"'
        parse('thursday').day.should.eql 4
      end
    end
    
    describe 'next <day>'
      describe 'given a <day>'
        it 'should work with "monday"'
          parse('next monday').day.should.eql 1
        end

        it 'should work with "tuesday"'
          parse('next tuesday').day.should.eql 2
        end

        it 'should work with "wednesday"'
          parse('next wednesday').day.should.eql 3
        end

        it 'should work with "thursday"'
          parse('next thursday').day.should.eql 4
        end

        it 'should work with "friday"'
          parse('next friday').day.should.eql 5
        end

        it 'should work with "saturday"'
          parse('next saturday').day.should.eql 6
        end

        it 'should work with "sunday"'
          parse('next sunday').day.should.eql 0
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