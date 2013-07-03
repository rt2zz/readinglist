var Director = require('director')
var $ = require('./static/lib/jquery.shim.js')
var hb = require('handlebars')
var request = require('browser-request')
var async = require('async')

var ctrl = {}
var tmpl = {}
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
      request('http://localhost:3000/t/reader/nav', function(err, res){
        // console.log('nav tmp', res.body)
        cb(null, res.body)
      })
    }
  ]
  async.parallel(trys, function(err, results){
    var list = results[0]
    console.log('LIST', list)
    tmpl.main = results[1]
    tmpl.nav = results[2]
    var template = hb.compile(tmpl.main)
    var data = list[0]
    var html = template(data)
    // console.log(html)
    // console.log(data)
    $('.content').html(html)
  })
  tmpl.main = request('http://localhost:3000/t/reader/main')
}

function testCb(){
  console.log('test cb wofrking')
}

function testVar(arg){
  console.log('testvar with arg ', arg)
}

var routes = {
  '/reader': ctrl.reader,
  '/test': testCb,
  '/test/:var': testVar
};

var router = Director.Router(routes).configure({html5history:true});
router.init();

$(document).ready(function(){
  $('a[auri]').click(function(e){
    router.setRoute($(this).attr('href'))
    e.preventDefault()
  })
})