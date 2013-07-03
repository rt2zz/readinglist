var Account = require('../models/account.js')

module.exports.login = function(req, res){
  res.render('login.jade')
}


module.exports.logout = function(req, res){
  req.session.del('user', function(err){
    res.redirect('/')
  })
}

module.exports.authRequest = function(req, res){
  req.body(function(err, body){
    Account().authenticate('picket:'+body.username, body.pass, function(err, account){
      console.log('err auth req', err)
      if(err || !account){
        console.log('got err!!!')
        res.json({status:0})
      }
      else {
        req.session.set('user', account)
        res.json({status:1, account: account})
      }
    })
  })
}