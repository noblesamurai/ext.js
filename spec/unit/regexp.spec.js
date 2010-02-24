describe 'RegExp'
  describe '.escape()'
    it 'should escape the given string to be used as a RegExp'
      RegExp.escape('[\\w]+').should.equal '\\[\\\\w\\]\\+'
      RegExp.escape('\\{}[]test|()/?^!=:$').should.equal "\\\\\\{\\}\\[\\]test\\|\\(\\)\\/\\?\\^\\!\\=\\:\\$"
    end
  end
end
