var Account = require('../models/account.js')

module.exports.user = function(req, res){
  console.log('Account Page')
  req.session.get('user', function(err, account){
    locals = {account: account}
    res.render('account.jade', locals)
  })
}

module.exports.public = function(req, res){
  Account(req.route.params.alias).fetch(function(err, accountData){
    locals = {account: accountData}
    res.render('account.jade', locals)
  })
}