var app = require('./serve.js')

var stylwriter = require('stylwriter')


app.route('/bundle/*').nocache().files('client/bundles/')
app.route('/asset/*').nocache().files('client/assets/')

app.route('/style/:name', function(req, res){
  stylwriter('./client/styles/'+req.route.params.name+'.styl', res)
}).nocache()

// app.route("/*", mainRoute).nocache()
app.route("/", mainRoute).nocache()
app.route("/login", require('./routes/login.js').login).condition(requireAnon).nocache()
app.route("/logout", require('./routes/login.js').logout).nocache()

app.route("/article/:id", require('./routes/articles.js').article).nocache()
app.route("/articles", require('./routes/articles.js').pocketList).nocache()
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
app.route("/:alias/pocket", require('./routes/articles.js').pocketList).nocache()

app.route('/auth/pocket/requestToken', require('./routes/pocketAuth.js').requestToken).nocache()
app.route('/auth/pocket/accessToken', require('./routes/pocketAuth.js').accessToken).nocache()
app.route('/auth/pocket/return', require('./routes/pocketAuth.js').popReturn).nocache()


function mainRoute (req, res) {
  var locals = {aaa: 'bbb'}
  res.render('main.jade', locals)
}

function requireAuth(req, res, cb) {
  res.session.get('user', function(err, user){
    if(!user){
      res.redirect('/login', 302)
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

