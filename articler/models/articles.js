var _ = require('lodash')
var request = require('request')

var db = require('../db/article.js')

function Articles (sources){
  this.sources = sources
}

Article.prototype.list = function(cb){
  var articles = []
  this.sources.forEach(function(source){
    var iden = 'article~'+source+'~'
    db.createReadStream({
      start: iden
    })
    .on('data', function (data) {
      console.log(data.key, '=', data.value)
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
      cb(articles)
    })
    this.uid = 'article~'+source+'~'+ new Date().getTime() +'~' + this.url
  })
}

module.exports = function(sources){
  return new Articles(sources)
}

