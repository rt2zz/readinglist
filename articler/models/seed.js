var _ = require('lodash')
var Article = require('./article.js')
var async = require('async')

var db = require('../db/article.js')

function Seed (id, type){
  var prefix = ''
  if(type == 'tweet') prefix = 'seed~tweet~'
  this.id = prefix+id
  this.data = {}
  this.data.articles = []
}

Seed.prototype.setTweet = function(tweet){
  this.text = tweet.text
  this.data.tweet = tweet
  return this
}

Seed.prototype.source = function(source){
  this.data.source = source
  return this
}

Seed.prototype.process = function(cb){
  var self = this
  this.exists(function(exists){
    // console.log('checked if exitsts:', exists)
    if(exists){
      console.log('seed err: seed exists')
      cb(null, 'seed already exists, no processing necessary')
    }
    else{
      var matches = mediaExtractor(self.text)
      if(matches.length==0){
        console.log('seed err: no matches!!')
        cb(null, 'no matches for tweet '+self.data.tweet.id)
      }
      else{
        var trys = matches.map(function(url){
          return function(acb){
            Article(url).source(self.data.source).process(function(err, data){
              console.log('article process cb')
              // console.log('self.data', self.data)
              self.data.articles.push(url)
              acb(null, url)
            })
          }
        })
        async.parallel(trys, function(err, results){
          console.log('seed process async parralel')
          // console.log('results after all matches article processing', results)
          if(err){
            console.log('seed process trys cb err')
            cb(null, err)
          }
          else{
            self.save(function(err, data){
              cb(null, data)
            })
          }
        })
      }
    }
  })
}

Seed.prototype.exists = function(cb){
  db.get(this.id, function(err, data){
    if(data) cb(true)
    else cb(false)
  })
}

Seed.prototype.save = function(cb){
  var self = this
  db.get(self.id, function(err, data){
    if(data) self.data = _.merge(data, self.data)
    db.put(self.id, self.data)
    cb(null, self.data)
  })
}

function mediaExtractor(text){
  var regex = new RegExp('https?:\/\/[a-zA-Z0-9\.\/]*', 'g')
  // console.log(regex.exec(tweet.text))
  // console.log(regex.exec('http://google.com'))
  var matches = []
  while (match = regex.exec(text)) {
    matches.push(match[0])
  }
  return matches
}

module.exports = function(id, type){
  return new Seed(id, type)
}

