
parse = require('ext/date').parse

describe 'date'
  describe 'parse()'
    describe 'today'
      it 'should work'
        var now = new Date
        parse('today', now).should.eql now
      end
    end
    
    describe 'yesterday'
      it 'should work'
        var date = parse('yesterday', new Date('May 2, 2001'))
        date.toString().should.match(/^Tue May 01/)
      end
    end
    
    describe 'in <int> <quantifier>'
      describe 'given "a"'
        it 'should act as 1'
          var date = parse('in a day', new Date('May 1, 2001'))
          date.toString().should.match(/^Wed May 02/)
        end  
      end
      
      describe 'given <int>'
        describe 'given <quantifier>'
          it 'should work'
            var date = parse('in 2 days', new Date('May 1, 2001'))
            date.toString().should.match(/^Thu May 03/)
            var date = parse('in 3 years', new Date('May 1, 2001'))
            date.year.should.eql 2004
          end
        end
        
        describe 'omitting <quantifier>'
          it 'should throw an error'
            -{ parse('in 2') }.should.throw_error(/expected quantifier after int/)
            -{ parse('in 2 monday') }.should.throw_error(/expected quantifier after int/)
          end
        end
      end
      
      describe 'omitting <int>'
        it 'should throw an error'
          -{ parse('in') }.should.throw_error(/expected int after in/)
          -{ parse('in monday') }.should.throw_error(/expected int after in/)
        end
      end
    end
  
    describe '<day>'
      it 'should work like "next <day>"'
        parse('thursday').day.should.eql 4
      end
    end
    
    describe 'next <day>'
      describe 'given a <day>'
        it 'should work with "monday"'
          var date = parse('next monday', new Date('May 1, 2001'))
          date.toString().should.match(/^Mon May 07/)
        end

        it 'should work with "tuesday"'
          var date = parse('next tuesday', new Date('May 1, 2001'))
          date.toString().should.match(/^Tue May 08/)
        end

        it 'should work with "wednesday"'
          var date = parse('next wednesday', new Date('May 1, 2001'))
          date.toString().should.match(/^Wed May 09/)
        end

        it 'should work with "thursday"'
          var date = parse('next thursday', new Date('May 1, 2001'))
          date.toString().should.match(/^Thu May 10/)
        end

        it 'should work with "friday"'
          var date = parse('next friday', new Date('May 1, 2001'))
          date.toString().should.match(/^Fri May 11/)
        end

        it 'should work with "saturday"'
          var date = parse('next saturday', new Date('May 1, 2001'))
          date.toString().should.match(/^Sat May 12/)
        end

        it 'should work with "sunday"'
          var date = parse('next sunday', new Date('May 1, 2001'))
          date.toString().should.match(/^Sun May 13/)
        end
      end
      
      describe 'with month overflow'
        it 'should work'
          var date = parse('next monday', new Date('May 30, 2001'))
          date.toString().should.match(/^Mon Jun 04/)
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