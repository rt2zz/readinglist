module.exports = function(req, res){
  req.user(function(err, account){
    var locals = {account: account}
    res.render('reader/account.jade', locals)
  })
}