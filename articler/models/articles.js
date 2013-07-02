var _ = require('lodash')
var request = require('request')

var db = require('../db/article.js')

function Articles (sources){
  this.sources = sources
}

Articles.prototype.list = function(cb){
  var articles = []
  var len = this.sources.length
  var ends = 0
  this.sources.forEach(function(source){
    var iden = 'article~'+source+'~'
    db.createReadStream({
      start: iden
    })
    .on('data', function (data) {
      if(data.key.indexOf(iden) != 0){
        console.log('iden not 0')
        this.destroy()
      }
      else{
        articles.push(data.value)
      }
    })
    .on('error', function (err) {
      console.log('Oh my!', err)
    })
    .on('close', function () {
      console.log('Stream closed')
    })
    .on('end', function () {
      console.log('Stream closed')
      ends++
      console.log('ends now', ends)
      if(ends == len){
        console.log('ends = length')
        cb(null, articles)
      }  
    })
  })
}

module.exports = function(sources){
  return new Articles(sources)
}

