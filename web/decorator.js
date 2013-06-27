module.exports = decorate

var url = require('url')
var Templar = require('templar')
Templar.loadFolder('./templates')
var jade = require('jade')
var templarOptions = { engine: jade, folder: './templates', cache:false }

var session = require('./session.js')

function decorate(req, res, cb){
  res.redirect = function (target, code) {
    res.statusCode = code || 302
    // strip out \n etc.
    target = url.format(target)
    res.setHeader('location', target)
    res.end()
  }

  res.render = Templar(req, res, templarOptions)

  session(req, res, function(){
    cb(req, res)
  })
}