
var cache = {}

Ext.extend(String.prototype, {
  get lambda() {
    if (cache[this]) return cache[this]

    var params   = [],
        body     = this,
        sections = this.split(/\s*->\s*/m)

    if (sections.length > 1) {
      sections.each(function () {
        body   = sections.pop()
        params = sections.pop().split(/\s*,\s*|\s+/m)
        sections.push('(function (' + params + ') { return (' + body + ') })')
      })
    } else {
      var left, right
      body = body.replace(/\((.+)\)/m, '$1')
      if (left = body.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=|(\[.+\]))/m)) {
        params.push('$1')
        body = '$1' + body
      }
      if (right = body.match(/[+\-*\/%&|\^\.=<>!]\s*$/m)) {
        params.push('$2')
        body = body + '$2'
      }
    }

    try {
      return cache[this] = new Function(params, 'return (' + body + ')')
    } catch (e) {
      throw new SyntaxError('Invalid lambda expression: `' + this + '` (' + e.message + ')')
    }
  }
})

