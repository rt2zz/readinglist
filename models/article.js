var levelup = require('levelup')
var db = levelup('./dbs/article', {valueEncoding: 'json', keyEncoding: 'json'})
var _ = require('lodash')

function Account (id){
  this.id = id
}

Account.prototype.data = function(data){
  this.data = data
  return this
}

Account.prototype.save = function(cb){
  db.put(this.id, this.data, function(err){
    if(err){
      console.log('err saving in model', err)
      cb(err)
    }
    else{
      cb(null, this.data)
    }
  })
}

Account.prototype.fetch = function (cb){
  var self = this
  db.get(self.id, function(err, article){
    if(err) cb(err)
    else{
      cb(null, article)
    }
  })
}



module.exports = function(id){
  return new Account(id)
}

module.exports.db = db
