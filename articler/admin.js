var multilevel = require('multilevel')
var net = require('net')
var spawn = require('child_process').spawn


var articledb = require('./db/article.js')

net.createServer(function (c) {
  c.pipe(multilevel.server(articledb)).pipe(c)
}).listen(4003)

spawn('levelweb', ['--client=4003', '--https=5003'], {cwd: 'tmp'})


// Cannot currently expose session db because levelweb -> multilevel assumes json keyEncoding.  
// net.createServer(function (c) {
//   c.pipe(multilevel.server(sessdb)).pipe(c)
// }).listen(3002)
