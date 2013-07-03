var Account = require('../models/account.js')

var qs = require('querystring')
var tconfig =
    { consumer_key: 'J2XcZYlBFU0hjrt4ooYqWg'
    , consumer_secret: 'vbh21yfR9VbI80BapiswGi6IsfuAYwUYPIOwjjQqvM'
    }
var url = require('url');

var request = require('request')

module.exports.requestToken = function(req, res){
  var oauth = tconfig
  var q = 'https://api.twitter.com/oauth/request_token'

  oauth.callback = 'http://localhost:3000/twitter/access'
  request.post({url:q, oauth:oauth}, function (e, r, body) {
    var data = qs.parse(body)
    var oauth_token = data.oauth_token
    req.session.set('twitterOauthData', data, function(err){
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token) 

    })
  })
}

module.exports.accessToken = function(req, res){
  var url_parts = url.parse(req.url, true);
  var qdata = url_parts.query;
  var oauth = tconfig
  oauth.token = qdata.oauth_token
  oauth.verifier = qdata.oauth_verifier
  var q = 'https://api.twitter.com/oauth/access_token'
  request.post({url:q, oauth:oauth}, function (e, r, body) {
    var data = qs.parse(body)
    Account('twitter:'+data.screen_name).preferredAlias(data.screen_name).setData({twitter: data}).save('merge', function(err, account){
      req.session.set('user', account, function(err){
        if(account.setup) res.redirect('/reader')
        else res.redirect('/setup')
      })
    })
  })
}

//   request.post({url:url, oauth:oauth}, function (e, r, body) {
//     var perm_token = qs.parse(body)
//       , oauth = 
//         { consumer_key: CONSUMER_KEY
//         , consumer_secret: CONSUMER_SECRET
//         , token: perm_token.oauth_token
//         , token_secret: perm_token.oauth_token_secret
//         }
//       , url = 'https://api.twitter.com/1/users/show.json?'
//       , params = 
//         { screen_name: perm_token.screen_name
//         , user_id: perm_token.user_id
//         }
//       ;
//     url += qs.stringify(params)
//     request.get({url:url, oauth:oauth, json:true}, function (e, r, user) {
//       console.log(user)
//     })
//   })
// })