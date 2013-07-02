var _ = require('lodash')
var twitter = require('ntwitter')
var Seed = require('./seed.js')
var async = require('async')

var db = require('../db/article.js')


function Source (id, service){
  var prefix = ''
  if(service == 'twitter'){
    prefix = 'source~twitter~'
    tid = 't' + id
  }
  this.id = tid
  this.uid = prefix+tid
  this.data = {
    twitterId: id
  }
}

Source.prototype.oauth = function(oauth){
  console.log('oauth method', oauth)
  this.oauth = this.data.oauth = oauth
  return this
}

Source.prototype.process = function(cb){
  //@todo: generalize service so that this can work for more than just twitter
  var twit = new twitter({
    consumer_key: 'J2XcZYlBFU0hjrt4ooYqWg',
    consumer_secret: 'vbh21yfR9VbI80BapiswGi6IsfuAYwUYPIOwjjQqvM',
    access_token_key: this.oauth.oauth_token,
    access_token_secret: this.oauth.oauth_token_secret
  });

  var self = this
  db.get(self.uid, function(err, data){
    var params = {
      trim_user: true,
      exclue_replies: true
    }
    // if(data && data.lastTweet) params.since_id = data.lastTweet
    // else params.count = 10
    params.count = 10
    params.user_id = self.data.twitterId
    console.log('t params', params)

    twit.getUserTimeline(params, function(err, tweets){
      if(tweets.length > 0){
        self.lastTweet(tweets[0].id)
        if(!data) self.firstTweet = tweets[tweets.length-1].id
      }
      self.save(function(err, source){
        console.log('source save cb')
        var trys = tweets.map(function(tweet){
          return function(acb){
            Seed(tweet.id, 'tweet').source(self.id).setTweet(tweet).process(function(err, data){
              console.log('seed callback')
              if(err){
                acb(err)
              }
              else{
                acb(null, data)
              }
            })
          }
        })
        console.log('trys length', trys.length)
        async.parallel(trys, function(err, results){
          console.log('async err', err)
          console.log('source async parallel')
          console.log('source reults', results)
          cb(null, 'results')
        })  
      })
    })
  })
}

Source.prototype.lastTweet = function(tid){
  this.data.lastTweet = tid
  return this
}

Source.prototype.save = function(cb){
  var self = this
  db.get(self.uid, function(err, data){
    if(data) self.data = _.merge(data, self.data)
    db.put(self.uid, self.data)
    cb(null, self.data)
  })
}

module.exports = function(id, service){
  return new Source(id, service)
}
