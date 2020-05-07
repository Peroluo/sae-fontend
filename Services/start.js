require('babel-core/register')()
require('babel-polyfill')
require('./index.js')

console.log('env: ', process.env.NODE_ENV)
