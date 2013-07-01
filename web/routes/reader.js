var Account = require('../models/account.js')
var request = require('request')

module.exports = function(req, res){
  req.user(function(err, account){
    Account(account.uid).fetch(function(err, data){
      var sources = data.lists.default.sources

      var opts = {
        body: {
          sources: sources
        },
        json: true
      }
      request.post('http://localhost:3003/list', opts, function(e, r, body){
        console.log('body.articles', body.articles)
        var locals = {
          articles: body.articles
        }
        res.render('reader.jade', locals)
      })
    })
  })
}