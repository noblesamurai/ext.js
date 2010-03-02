
# ext.js - JavaScript Extensions &amp; Utilities

High quality JavaScript extensions for various tasks such as
formatting dates, currency helpers, and more. This library targets node.js and
server-side frameworks such as [Express](http://github.com/visionmedia/express).

Ext.js uses the CommonJS module pattern when needed.
Additionally, **all** of the native object extensions are non-enumerable,
and you may create your own via Ext.extend(prototype, methods).

## Extensions

To use simply:
    require('ext')

### Object

  * Object#keys
  * Object#values
  * Object#alias(orig, alias)
  * Object#tap(fn[, context])
  * Object#reduce(fn[, memo])
  * Object#merge(obj[, reverse])
  * Object#each(fn[, context])
  * Object#map(fn[, context])
  * Object#filter(fn[, context]) aliased as select()
  * Object#every(fn[, context]) aliased as all()
  * Object#some(fn[, context]) aliased as any()
  * Object#reject(fn[, context])
  * Object#respondsTo(key)

### Array

  * Array#each(fn[, context])
  * Array#excludes(item[, item, ...])
  * Array#includes(item[, item, ...])
  * Array#clear
  * Array#flatten
  * Array#first
  * Array#last
  * Array#sum
  * Array#avg
  * Array#min
  * Array#max
  * Array#sample
  * Array#compact([removableValues])
  * Array#at(index)
  * Array#drop(n)
  * Array#take(n)
  * Array#reduce(fn[, memo])
  * Array#reject(fn[, context])
  * Array#filter(fn[, context]) aliased as select()
  * Array#some(fn[, context]) aliased as any()
  * Array#detect(fn[, context]) aliased as find()
  * Array#none(fn[, context])
  * Array#grep(pattern)
  * Array#remove(obj[, fn[, context]])
  * Array#isEmpty

### Number

  * Number#ordinalize
  * Number#currency
  * Number#second     / Number#seconds
  * Number#minute     / Number#minutes
  * Number#hour       / Number#hours
  * Number#day        / Number#days
  * Number#week       / Number#weeks
  * Number#month      / Number#months
  * Number#year       / Number#years
  * Number#toMinutes
  * Number#toHours
  * Number#toDays
  * Number#toWeeks
  * Number#toMonths
  * Number#toYears
  * Number#ago
  * Number#times(fn[, context])
  * Number#isFloat

### String

  * String#variable
  * String#uppercase
  * String#lowercase
  * String#camelcase
  * String#digitize
  * String#strip
  * String#drop(n)
  * String#take(n)
  * String#before(str)
  * String#after(str)
  * String#padLeft(width[, char])
  * String#padRight(width[, char])
  * String#remove(pattern)
  * String#startsWith(str)
  * String#endsWith(str)
  * String#capitalize([all])
  * String#wrap(prefix[, suffix])
  * String#singular
  * String#plural
  * String#isPlural
  * String#isSingular
  * String#includes(str)
  * String#gsub(pattern, replacement[, scope])
  * String#count(str)

### Date

  * Date#year
  * Date#month
  * Date#date
  * Date#day
  * Date#hours
  * Date#minutes
  * Date#seconds
  * Date#milliseconds
  * Date#monthName
  * Date#shortMonthName
  * Date#dayName
  * Date#shortDayName
  * Date#format(str)
  * Date#inWordsSince(date)
  * Date#inWordsSinceNow
  * Date#parse(str)
  * parse(str[, date])

### RegExp

  * RegExp.escape(str[, chars])
  
### Function
  
  * Function#bind(context)

### Base64

  * String#base64Encode / encode(str)
  * String#base64Decode / decode(str)

### Error

  * Error.raise([name[, message[, object]]])

## MD5

  * String#md5 / hash(str)

### printf

  * sprintf(str[, arg[, ...]])
  * eprintf(str[, arg[, ...]])
  * printf(str[, arg[, ...]])

## Iterator Functions

Ext.js allows most iterators to use _"function shorthand syntax"_,
which allows you to define a function by passing a string,
as shown in some of the examples below.

### Literals

    [1,2,3,4,5].select(function(n){ return n > 3 })
    // => [4,5]

### Properties

    ['hello', 'there'].map('length')
    // => [5,5]

### Methods

    [1,2,3].map('toString()')
    // => ['1','2','3']

### Binary Operators

    [1,2,3,4,5].select('> 3')
    // => [4,5]
    
### Object Usage

    { foo: 'bar', baz: 'something' }.select(".length > 3")
    // => { baz: 'something' }

## Date Parsing

The module _ext/date_ exports the **parse()** function which accepts
a _string_ to parse, as well as an optional _date_ which represents "now".

Below are some examples:

    new Date
    // => Fri, 26 Feb 2010 19:16:47 GMT

    parse('today')
    // => Fri, 26 Feb 2010 19:16:47 GMT

    parse('yesterday')
    // => Thu, 25 Feb 2010 19:16:47 GMT

    parse('in 5 hours')
    // => Sat, 27 Feb 2010 00:16:47 GMT

    parse('in 2 days')
    // => Sun, 28 Feb 2010 19:16:47 GMT

    parse('next tuesday')
    // => Tue, 02 Mar 2010 19:16:47 GMT

More examples:

    'in a year'
    'in one year'
    'in five days'
    'in three hundred minutes'
    'in fifty two minutes'
    'in seventy five trillion seconds'
    'in five and a half minutes'

## Running Tests

    $ make test

## Contributors

  * TJ Holowaychuk (visionmedia)
  * Tobias Svensson (tobiassvn)

## License

(The MIT License)

Copyright (c) 2009 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

