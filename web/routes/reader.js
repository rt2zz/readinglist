var Account = require('../models/account.js')

module.exports = function(req, res){
  req.user(function(err, account){
    Account(account.uid).fetch(function(err, data){
      var sources = data.lists.default.sources

      var opts = {
        body: {
          sources: sources
        }
        json: true
      }
      request.post('http://localhost:4003/list', opts, function(e, r, body){
        console.log(body)
        var locals = {
          articles: body.articles
        }
        res.render('reader.jade', locals)
      })
    })
  })
  res.render('reader.jade')
}