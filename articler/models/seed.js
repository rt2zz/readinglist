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

Seed.prototype.process = function(cb){
  var self = this
  var matches = mediaExtractor(self.text)
  console.log(self.text)
  console.log('matches:', matches)
  if(matches.length==0) cb('no matches for tweet '+self.data.tweet.id)
  else{
    var trys = matches.map(function(url){
      return function(acb){
        Article(url).process(function(err, data){
          // console.log('self.data', self.data)
          self.data.articles.push(url)
          console.log('after processing article:', err, data)
          acb(null, url)
        })
      }
    })
    async.parallel(trys, function(err, results){
      // console.log('results after all matches article processing', results)
      if(err){cb(err)}
      else{
        self.save(function(err, data){
          cb(null, data)
        })
      }
    })
  }
}

Seed.prototype.save = function(cb){
  var self = this
  db.get(self.id, function(err, data){
    if(data) self.data = _.merge(data, self.data)
    // console.log('Seed DATA', self.data)
    db.put(self.id, self.data)
    cb(null, self.data)
  })
}

function mediaExtractor(text){
  var regex = new RegExp('https?:\/\/[a-zA-Z0-9\.\/]*', 'g')
  console.log('testing:', text)
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

