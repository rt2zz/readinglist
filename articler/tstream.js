var tstream = {}
var Source = require('./models/source.js')
var async = require('async')

tstream.process = function(ids, oauth, cb){
  console.log(ids, oauth)
  var trys = ids.map(function(id){
    return function(rcb){
      Source(id, 'twitter').oauth(oauth).process(function(err, data){
        rcb(null, data)
      })
    }
  })

  async.parallel(trys, function(results){
    console.log('returning in tstream')
    cb(null, results)
  })
}


module.exports = tstream