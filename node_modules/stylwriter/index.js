var styl = require('styl')
var fs = require('fs')
var crypto = require('crypto')
var path = require('path')
var through = require('through')

var filecache = {}

module.exports = function(readPath, outputStream){
  var absReadPath = path.resolve(readPath)
  var writePath = absReadPath.split('.')[0] + '.css'
  fs.readFile(absReadPath, {encoding: 'utf8'}, function (err, data) {

    if (err) {
        throw err;
    }

    var hash = crypto.createHash('md5');
    hash.update(data);
    var hashVal = hash.digest('hex')

    if(typeof filecache[absReadPath] == undefined || filecache[absReadPath] != hashVal){
      css = styl(data, { whitespace: true }).toString();

      fs.writeFile(writePath, css, function(err){
        if(err) throw err;
        filecache[absReadPath] = hashVal
      })

      if(typeof outputStream != undefined){
        var stream = through().pause().queue(css).end()
        stream.pipe(outputStream)
        stream.resume()
      }
    }
    else{
      if(typeof outputStream != undefined){
        outputStream.pipe(fs.createWriteStream(writePath))
      }
    }
  });
}