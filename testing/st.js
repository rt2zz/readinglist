var stylwriter = require('stylwriter')

var path = require('path')
var stylpath = path.resolve('./test.styl')

setInterval(function(){
  stylwriter('./test.styl')
}, 500)
