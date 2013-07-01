var _ = require('lodash')
var request = require('request')

var Diffbot = require('diffbot').Diffbot
var diffbot = new Diffbot('989ffc86ca31790cfc60fe9d4c028611');

var db = require('../db/article.js')

function Article (url){
  this.url = url
  this.data = {}
}

Article.prototype.source = function(source){
  this.source = source
  this.uid = 'article~'+source+'~'+ new Date().getTime() +'~' + this.url
  return this
}

Article.prototype.process = function (cb){
  var self = this
  console.log('process article')
  diffbot.article({uri: self.url}, function(err, response) {
    // console.log(response);
    self.data.parts = response
    self.save(function(err, data){
      if(err){
        cb(err)
      }
      else{
        cb(null, data)
      }
    })
  });
}

Article.prototype.save = function(cb){
  var self = this
  if(!self.uid) cb('err source & uid not set')
  else{
    db.get(self.uid, function(err, data){
      if(data) self.data = _.merge(data, self.data)
      console.log('Article DATA', self.data)
      db.put(self.uid, self.data)
      cb(null, self.data)
    })
  }
}

module.exports = function(url){
  return new Article(url)
}

