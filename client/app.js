var Director = require('director')
var $ = require('./static/lib/jquery.shim.js')
var hb = require('handlebars')
var request = require('browser-request')
var async = require('async')

var ctrl = {}
var tmpl = {}

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

ctrl.reader = function (){
  console.log('root cb working')
  var trys = [
    function(cb){
      request({url:'http://localhost:3000/d/list/default', json:true}, function(err, res){
        // console.log('d', res.body)
        cb(null, res.body)
      })
    },
    function(cb){
      request('http://localhost:3000/t/reader/main', function(err, res){
        // console.log('main tmp', res.body)
        cb(null, res.body)
      })
    },
    function(cb){
      request('http://localhost:3000/t/reader/list', function(err, res){
        // console.log('nav tmp', res.body)
        cb(null, res.body)
      })
    }
  ]
  async.parallel(trys, function(err, results){
    var list = results[0]
    tmpl.main = results[1]
    tmpl.list = results[2]
    var template = hb.compile(tmpl.main)
    var data = list[0]
    var html = template(data)
    $('.content').html(html)

    var data = {articles:list}
    var nav = hb.compile(tmpl.list)
    var navhtml = nav(data)
    $('.list').html(navhtml)
  })
}

ctrl.account = function(){
  request('http://localhost:3000/t/reader/account', function(err, res){
    $('.content').html(res.body)
  })
}

function testVar(arg){
  console.log('testvar with arg ', arg)
}

var routes = {
  '/reader': ctrl.reader,
  '/reader/account': ctrl.account,
  '/test/:var': testVar
};

var router = Director.Router(routes).configure({html5history:true});
router.init();

$(document).ready(function(){
  console.log('config')
  $('.topnav .links a').click(function(e){
    console.log('clicked topnav', $(this).hasClass('active'))
    var active = $(this).hasClass('active')
    e.preventDefault()
    $('.topnav .links a').removeClass('active')
    if(active){
      console.log('has class')
      router.setRoute('/reader')
      $(this).removeClass('active')
    }
    else{
      router.setRoute($(this).attr('href'))
      $(this).addClass('active')
    }
  })
  $('a[uri]').click(function(e){
    console.log('clickage')
    router.setRoute($(this).attr('uri'))
    e.preventDefault()
  })
})

