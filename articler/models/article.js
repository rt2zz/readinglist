var _ = require('lodash')
var request = require('request')

var db = require('../db/article.js')

function Article (url){
  this.url = url
  this.uid = 'article~'+url
  this.data = {}
}

Article.prototype.process = function (cb){
  var self = this
  request(self.url, function(e, r, body){
    self.data.body = body
    self.save(function(err, data){
      if(err){
        cb(err)
      }
      else{
        cb(null, data)
      }
    })
  })
}

Article.prototype.save = function(cb){
  var self = this
  db.get(self.uid, function(err, data){
    if(data) self.data = _.merge(data, self.data)
    console.log('Article DATA', self.data)
    db.put(self.uid, self.data)
    cb(null, self.data)
  })
}

module.exports = function(url){
  return new Article(url)
}

