
parse = require('ext/date').parse

describe 'date'
  describe 'parse()'
    describe '<day>'
      it 'should work with "monday"'
        var date = parse('monday')
        
      end  
    end
    
    describe 'next <day>'
      it 'should work'
        var date = parse('next thursday')
      end  
    end
    
  end
end