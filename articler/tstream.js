var tstream = {}
var Source = require('./models/source.js')
var async = require('async')

tstream.process = function(ids, oauth, cb){
  console.log(ids, oauth)
  var trys = ids.map(function(id){
    return function(rcb){
      Source(id, 'twitter').oauth(oauth).process(function(err, data){
        // console.log('data from processing source:', data)
        rcb(data)
      })
    }
  })

  async.parallel(trys, function(results){
    // console.log('results: ', results)
    cb(results)
  })
  //try to find user
  //if new -> add user -> get default
  //if exists -> get last and request from there
  //save tweets to db, update follow
  //handle article processing elsewhere
  //return object by key with processing details
}


module.exports = tstream