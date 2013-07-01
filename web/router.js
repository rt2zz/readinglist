var app = require('./serve.js')

//@todo: Super simple & niave cache flusher.  needs work, and to be split off into dev only script
var watch = require('watch')
watch.createMonitor('./templates', function (monitor) {
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

app.route("/login", require('./routes/login.js').login).condition(requireAnon).nocache()
app.route("/logout", require('./routes/login.js').logout).nocache()

app.route("/reader", require('./routes/reader.js')).nocache()

app.route("/twitter", require('./routes/twitterAuth.js').requestToken).nocache()
app.route("/twitter/access", require('./routes/twitterAuth.js').accessToken).nocache()
app.route("/splash", function(req, res){
    res.render('splash.jade')
  }).nocache()

app.route("/auth/login", require('./routes/login.js').authRequest).nocache()
app.route("/account", require('./routes/account.js').user).condition(requireAuth).nocache()
app.route("/setup", require('./routes/account.js').setup).condition(requireAuth).nocache()
app.route("/setup/complete", require('./routes/account.js').setupComplete).condition(requireAuth).nocache()


app.route("/account/:alias", require('./routes/account.js').public).nocache()

function requireAuth(req, res, cb) {
  res.session.get('user', function(err, user){
    if(!user){
      res.redirect('/splash', 302)
    }
    else{
      cb()
    }
  })
}   

function requireAnon(req, res, cb) {
  res.session.get('user', function(err, user){
    if(user){
      res.redirect('/account', 302)
    }
    else{
      cb()
    }
  })
}   

