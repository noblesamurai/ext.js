
// ext.js - Import - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('fs').readdirSync(__dirname + '/').forEach(function (file) {
  if (m = file.match(/(.*)\.js$/)) {
        require('sys').puts(m[1])
        var r = require('./' + m[1])
        if (m[1] === 'printf') process.mixin(r);
  }
})

