var Account = require('../models/account.js')
var request = require('request')
var qs = require('querystring')
var async = require('async')

var twitter = require('ntwitter');

module.exports.user = function(req, res){
  console.log('Account Page')
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
  var q = 'https://api.twitter.com/1.1/friends/list.json'
  req.session.get('user', function(err, account){
    var oauth = 
        { consumer_key: 'J2XcZYlBFU0hjrt4ooYqWg'
        , consumer_secret: 'vbh21yfR9VbI80BapiswGi6IsfuAYwUYPIOwjjQqvM'
        , token: account.twitter.oauth_token
        , token_secret: account.twitter.oauth_token_secret
        }
    request({url: q, oauth:oauth}, function(e, r, body){
      var data = JSON.parse(body)
      var locals = {
        friends: data.users
      }
      res.render('setup.jade', locals)    
    })
  })
  
}

module.exports.setupComplete = function(req, res){
  console.log('setupcomplete')
  console.log(req)
  req.body(function(err, body){
    req.session.get('user', function(err, account){
      var twit = new twitter({
        consumer_key: 'J2XcZYlBFU0hjrt4ooYqWg',
        consumer_secret: 'vbh21yfR9VbI80BapiswGi6IsfuAYwUYPIOwjjQqvM',
        access_token_key: account.twitter.oauth_token,
        access_token_secret: account.twitter.oauth_token_secret
      });

      console.log(body)
      var follows = body.follows.split(',')
      var gets = follows.map(function(id){
        return function(cb){
          twit.getUserTimeline({user_id: id, count:10}, function(err, data){
            cb(null, data)
          })
        }
      })

      async.parallel(gets, function(err, results){
        console.log('results', results)
      })

      res.end('hi')
    })

    // req.session.get('user', function(err, account){
    //   Account(account.aliases[0]).follow('twitter', follows).save('merge', function(err, account){
    //     console.log('cb account', account)
    //     res.redirect('/reader')
    //   })
    // })
  })
}