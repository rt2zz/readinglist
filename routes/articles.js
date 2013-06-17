var pocket = require('pocket')
var Account = require('../models/account.js')
var Article = require('../models/article.js')
var _ = require('lodash')
var readability = require('readabilitySAX')

module.exports.pocketList = function(req, res){
  var alias = req.route.params.alias
  Account(alias).fetch(function(err, account){
    var config = {
      consumerKey: '13758-fd1d98647902db11ed51c821',
      accessToken: account.pocket.accessToken
    }
    var Pocket = pocket(config)
    Pocket.get(function(err, list){
      _.forEach(list.list, function(item){
        Article(item.item_id).data(item).save(function(err){
          console.log('article save err', err)
        })
      })
      res.render('pocketList.jade', {list: list})
    })
  })
  
}

module.exports.article = function(req, res){
  console.log('article route handler')
  var id = req.route.params.id
  Article(id).fetch(function(err, article){
    console.log('err', err)
    console.log('article', article)
    readability.get(article.given_url, {}, function(result){
      console.log('result, ', result)
      res.render('article.jade', {article: article, parsed: result})
    })
  })
}