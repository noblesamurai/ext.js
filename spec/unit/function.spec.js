
describe 'Function'
  describe '#bind()'
    it 'should return a function executing in context to the given object'
      var stream = { buf: '', puts: function(str) { this.buf += str + '\n' }}
      function log(msg) { this.puts(msg) }
      var logToStream = log.bind(stream)
      logToStream('foo')
      logToStream('bar')
      stream.buf.should.eql 'foo\nbar\n'
    end
  end
end