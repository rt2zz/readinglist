
var multilevel = require('multilevel')
var net = require('net')
var levelup = require('levelup')

var userdb = require('./models/account.js').db
var sessdb = require('./session.js')

net.createServer(function (c) {
  c.pipe(multilevel.server(userdb)).pipe(c)
}).listen(3001)


// Cannot currently expose session db because levelweb -> multilevel assumes json keyEncoding.  
// net.createServer(function (c) {
//   c.pipe(multilevel.server(sessdb)).pipe(c)
// }).listen(3002)
