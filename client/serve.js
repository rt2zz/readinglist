var jaws = require("jaws")

var app = module.exports =  jaws({})
var stylwriter = require('stylwriter')

app.route('/bundle/*').files('static/bundles')
app.route('/asset/*').files('static/assets')

app.route('/style/:name', function(req, res){
  var base = req.route.params.name.split('.')[0]
  stylwriter('./static/styles/'+base+'.styl', res)
})

app.httpServer.listen(3001, function () {
  console.log("Running now.")
})

//@todo: Supe simple & niave cache flusher.  needs work, and to be split off into dev only script
var watch = require('watch')
watch.createMonitor('static', 
function (monitor) {
  monitor.on("created", function (f, stat) {
    // Handle new files
  })
  monitor.on("changed", function (f, curr, prev) {
    console.log('changed, now flushing')
    app.flush()
  })
  monitor.on("removed", function (f, stat) {
    // Handle removed files
  })
})