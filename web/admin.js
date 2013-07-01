
var multilevel = require('multilevel')
var net = require('net')
var levelup = require('levelup')
var spawn = require('child_process').spawn

var userdb = require('./models/account.js').db
var sessdb = require('./session.js')

net.createServer(function (c) {
  c.pipe(multilevel.server(userdb)).pipe(c)
}).listen(4000)

spawn('levelweb', ['--client=4000', '--https=5000'], {cwd: 'tmp'})


// Cannot currently expose session db because levelweb -> multilevel assumes json keyEncoding.  
// net.createServer(function (c) {
//   c.pipe(multilevel.server(sessdb)).pipe(c)
// }).listen(3002)
