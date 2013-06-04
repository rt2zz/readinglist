var Director = require('director')
var $ = require('./lib/jquery.shim.js')

function rootCb(){
  console.log('root cb working')
}

function testCb(){
  console.log('test cb working')
}

function testVar(arg){
  console.log('testvar with arg ', arg)
}

var routes = {
  '/': rootCb,
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