var jaws = require("jaws")
var stylwriter = require('stylwriter')

var jade = require('jade')
, Templar = require('templar')
, templarOptions = { engine: jade, folder: './templates', cache:false }
Templar.loadFolder('./templates')

var app = jaws()

app.route('/bundle/*').nocache().files('client/bundles/')
app.route('/style/:name', function(req, res){
  stylwriter('./client/styles/'+req.route.params.name, res)
}).nocache()

app.route("/*", mainRoute).nocache()
app.route("/", mainRoute).nocache()

app.route("/account", function (req, res) {})

app.httpServer.listen(3000, function () {
  console.log("Running now.")
})

function mainRoute (req, res) {
  res.template = Templar(req, res, templarOptions)
  var locals = {aaa: 'bbb'}
  res.template('main.jade', locals)
}