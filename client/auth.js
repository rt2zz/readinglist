var $ = require('./lib/jquery.shim.js')
var sform = require('sform')
var view = {}

var pocket = require('pocket')()

$(document).ready(function(){
  var loginForm = sform($('#loginForm')).sync().action('/auth/login').responder(loginRequestHandler)

  $("[handler='pocketOauth']").click(function(e){
    e.preventDefault()
    pocket.auth.requestToken()
  })
})

function loginRequestHandler (err, data){ 
  if(data.status ==1){
    window.location.href = '/account'
  }
  else{
    view.loginFail()
  }
}

view.loginFail = function(){
  $('body').prepend('Password or Email are incorrect')
}

window.getAccessToken = function(){
  pocket.auth.accessToken()
}