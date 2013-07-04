var Director = require('director')
var $ = require('./static/lib/jquery.shim.js')
var hb = require('handlebars')
var request = require('browser-request')
var async = require('async')

// Persistent storage objects for caching & transport
var ctrl = {}
var tmpl = {}
var lists = {}
var activeList = 'default'
var activeArticle = null
var activeArticleIndex = 0

hb.registerHelper('date', function(date, options) {
  return new Date(date).toDateString()
})

hb.registerHelper('summary', function(text, options) {
  return text.substring(0, 128)
})

hb.registerHelper('json', function(obj, options) {
  return JSON.stringify(obj, null, 2)
})

hb.registerHelper('linker', function(url, text, options) {
  if(typeof text != 'string') text = url
  return  '<a href="'+url+'">'+text+'</a>'
})
hb.registerHelper('article_uri', function(slug, options) {
  return  href="/reader/"+activeList+"/"+slug
})

// Helper to load templates from server
function requestTemplate(data, cb){
  request(data.url, function(err, res){
    if(err){
      console.log('ERR')
      cb(null, err)
    }
    else{
      cb(null, res.body)
    }
  })
}

function getList(id, cb){
  if(lists[id]){
    cb(null, lists[id])
  }
  else{
    request({url:'http://localhost:3000/d/list/'+id, json:true}, function(err, res){
      if(err){
        console.log('ERR AFAF', err)
        cb(err)
      }
      else{
        var list = res.body
        var slugIndex = {}
        list.forEach(function(item, index){
          slugIndex[item.slug] = index
        })
        console.log(slugIndex)
        cb(null, list, slugIndex)
      }
    })
  }
}

ctrl.reader = function (listId, articleId){
  if(listId) activeList = listId
  if(articleId) activeArticle = articleId
  console.log('reader')
  getList(activeList, function(err, list, slugIndex){
    if(articleId) activeArticleIndex = slugIndex[activeArticle]
    var template = hb.compile(tmpl.main)
    var data = list[activeArticleIndex]
    var html = template(data)
    $('.content').html(html)
    var data = {articles:list}
    var nav = hb.compile(tmpl.list)
    var navhtml = nav(data)
    $('.list').html(navhtml).find('.item[index='+activeArticleIndex+']').addClass('active')
  })
}

ctrl.account = function(){
  request('http://localhost:3000/t/reader/account', function(err, res){
    // Hacky way to get the nav item active.  Ideally this is done from the server, or by a more general check
    $('.topnav .links a.account').addClass('active')

    $('.content').html(res.body)
  })
}

ctrl.account.after = function(){
  console.log('after')
  $('.topnav .links a.account').removeClass('active')
}

var routes = {
  '/reader': ctrl.reader,
  '/account': {on: ctrl.account, after: ctrl.account.after},
  '/reader/:listId': ctrl.reader,
  '/reader/:listId/:articleId': ctrl.reader,
};

var router = Director.Router(routes).configure({html5history:true});

var templatesToGet = [
  {key:'main', url:'http://localhost:3000/t/reader/main'},
  {key:'list', url:'http://localhost:3000/t/reader/list'},
  {key:'account', url:'http://localhost:3000/t/reader/account'}
]

async.map(templatesToGet, requestTemplate, function(err, results){
  results.forEach(function(item, i){
    tmpl[templatesToGet[i].key] = item
  })
  router.init();
})

$(document).ready(function(){
  $('.topnav .links a').click(function(e){
    var active = $(this).hasClass('active')
    e.preventDefault()
    $('.topnav .links a').removeClass('active')
    if(active){
      router.setRoute('/reader/'+activeList)
      $(this).removeClass('active')
    }
    else{
      router.setRoute($(this).attr('href'))
      $(this).addClass('active')
    }
  })
  $('body').on('click', 'a[auri]', function(e){
    router.setRoute($(this).attr('href'))
    e.preventDefault()
  })
})

