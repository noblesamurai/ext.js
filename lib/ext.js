
// ext.js - Core - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Version.
 */

Ext = { version: '0.1.0' }
process.mixin(Ext, require('ext/extend'))

require('ext/core_ext')
require('ext/md5')
require('ext/base64')
process.mixin(require('ext/printf'))

