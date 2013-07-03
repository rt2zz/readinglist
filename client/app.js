var Director = require('director')
var $ = require('./static/lib/jquery.shim.js')
var hb = require('handlebars')
var request = require('browser-request')

var ctrl = {}
var tmpl = {}
ctrl.reader = function (){
  console.log('root cb working')
  tmpl.main = request('http://localhost:3000/reader')
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