var Account = require('../models/account.js')
var request = require('request')
var qs = require('querystring')
var async = require('async')

var twitter = require('ntwitter');

module.exports.user = function(req, res){
  req.session.get('user', function(err, account){
    Account(account.aliases[0]).fetch(function(err, account){
      req.session.set('user', account)
      locals = {account: account}
      res.render('account.jade', locals)
    })
  })
}

module.exports.public = function(req, res){
  Account(req.route.params.alias).fetch(function(err, accountData){
    locals = {account: accountData}
    res.render('account.jade', locals)
  })
}

module.exports.setup = function(req, res){
  req.session.get('user', function(err, account){
    var twit = new twitter({
      consumer_key: 'J2XcZYlBFU0hjrt4ooYqWg',
      consumer_secret: 'vbh21yfR9VbI80BapiswGi6IsfuAYwUYPIOwjjQqvM',
      access_token_key: account.twitter.oauth_token,
      access_token_secret: account.twitter.oauth_token_secret
    });
    twit.getFriends(parseInt(account.twitter.user_id), function(e, data){
      var locals = {
        friends: data || []
      }
      res.render('setup.jade', locals)    
    })
  })
  
}

module.exports.setupComplete = function(req, res){
  req.body(function(err, body){
    req.user(function(err, account){
      var follows = body.follows.split(',')

      var params = {
        oauth: {
          oauth_token: account.twitter.oauth_token,
          oauth_token_secret: account.twitter.oauth_token_secret
        },
        follows: follows
      }

      var tfollows = follows.map(function(item){
        return 't'+item
      })
      
      var opts = {
        body: params,
        json: true
      }
      request.post('http://localhost:3003/twitter/setup', opts, function(e, r, body){
        Account(account.uid).setupComplete(true).defaultList(tfollows).save('merge', function(err, account){
          res.redirect('/reader', 302)
        })
      })
    })

    // req.session.get('user', function(err, account){
    //   Account(account.aliases[0]).follow('twitter', follows).save('merge', function(err, account){
    //     console.log('cb account', account)
    //     res.redirect('/reader')
    //   })
    // })
  })
}
