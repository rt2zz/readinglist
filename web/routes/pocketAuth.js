var Account = require('../models/account.js')

var pocketConfig = {
  consumerKey: '13758-fd1d98647902db11ed51c821'
}

var pocket = require('pocket')(pocketConfig)

function requestToken(req, res){
  pocket.getRequestToken('/myredirect', function(err, data){
    if(err) res.json({status:0, error: err})
    else res.json({status:1, requestToken:data.code})
  })
}

function accessToken(req, res){
  req.body(function(err, body){
    pocket.getAccessToken(body.requestToken, function(err, data){
      if(err) res.json({status:0, error: err})
      else{
        var accountData = {pocket:{linked: true, raw: data}}
        var accessToken = data.access_token
        var uid = 'pocket:'+data.username
        Account(uid)
          .data(accountData)
          .pocketAuth(accessToken)
          .preferredAlias(data.username)
          .save('merge', 
            function(err, accountData){
              console.log('SAVE CB', accountData)
              req.session.set('user', accountData, function(err){
                res.json({status:1, data: accountData})
              })
            })
      }
    })
  })
}

function popReturn(req, res){
  res.end('<script>window.opener.getAccessToken(); window.close()</script>')
}

module.exports = {
  requestToken: requestToken,
  accessToken: accessToken,
  popReturn: popReturn
}