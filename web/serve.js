var jaws = require("jaws")

var decorator = require('./decorator.js')

var jade = require('jade')

var app = module.exports =  jaws({}, decorator)
var router = require('./router.js')

var admin = require('./admin.js')

app.httpServer.listen(3000, function () {
  console.log("Running now.")
})

