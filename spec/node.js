
process.mixin(require('sys'))
require.paths.unshift('spec', 'spec/lib', 'lib')
require('jspec')
require('ext')

if (process.ARGV[2])
  JSpec.exec('spec/unit/' + process.ARGV[2] + '.spec.js')
else
  JSpec
    .exec('spec/unit/base64.spec.js')
    .exec('spec/unit/number.spec.js')
    .exec('spec/unit/printf.spec.js')
    .exec('spec/unit/md5.spec.js')
    .exec('spec/unit/regexp.spec.js')
    .exec('spec/unit/function.spec.js')
    .exec('spec/unit/array/iterators.spec.js')
    .exec('spec/unit/array/extensions.spec.js')
    .exec('spec/unit/array/collections.spec.js')
    .exec('spec/unit/date/parser.spec.js')
    .exec('spec/unit/date/extensions.spec.js')
    .exec('spec/unit/object/iterators.spec.js')
    .exec('spec/unit/object/extensions.spec.js')
    .exec('spec/unit/string/extensions.spec.js')
    .exec('spec/unit/string/inflections.spec.js')
    .exec('spec/unit/string/lambda.spec.js')
JSpec.run({ reporter: JSpec.reporters.Terminal, failuresOnly: true })
JSpec.report()

