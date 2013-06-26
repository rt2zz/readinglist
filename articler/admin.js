var multilevel = require('multilevel')
var net = require('net')

var articledb = require('./db/article.js')

net.createServer(function (c) {
  c.pipe(multilevel.server(articledb)).pipe(c)
}).listen(4003)


// Cannot currently expose session db because levelweb -> multilevel assumes json keyEncoding.  
// net.createServer(function (c) {
//   c.pipe(multilevel.server(sessdb)).pipe(c)
// }).listen(3002)
