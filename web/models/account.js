var levelup = require('levelup')
var db = levelup('./db/user', {valueEncoding: 'json', keyEncoding: 'json'})
var _ = require('lodash')
var async = require('async')

function Account (id){
  this.id = id
  this.data = {}
  this.data.lists = {}
  this.aliases = []
}

Account.prototype.setData = function(data){
  this.data = data
  return this
}

Account.prototype.setupComplete = function(state){
  if(typeof state != 'undefined') this.data.setup = state
  return this
}

Account.prototype.defaultList = function(sources){
  this.data.lists.default = {
    sources: sources
  }
  return this
}

Account.prototype.save = function(type, cb){
  var self = this
  self.fetch(function(err, accountData){
    self.new = accountData ? false : true
    if(!accountData) self.aliases.push(self.id)
    self.setAliases(function(err){
      if(accountData && type=='merge'){
        self.data = _.merge(accountData, self.data)
      }
      db.put(self.uid, self.data, function(err){
        if(err){
          console.log('save err', err)
          cb(err)
        }
        else{
          cb(null, self.data)
        }
      })
    })
  })
}

Account.prototype.setAliases = function(cb){
  var self = this
  var trys = self.aliases.map(function(alias){
    return function(asynccb){
      self.setAlias(alias, function(err, success){
        asynccb(err, success)
      })
    }
  })
  async.parallel(trys, function(err, results){
    cb(null)
  })
}

Account.prototype.setAlias = function(alias, cb){
  var self = this
  db.get('alias/'+alias, function(err, uid){
    if(!uid){
      db.put('alias/'+alias, self.uid, function(err){
        if(err){
          cb(err)
        }
        else{
          self.data.aliases = self.data.aliases || []
          if(alias == self.preferredAlias)self.data.aliases.unshift(alias)
          else self.data.aliases.push(alias)
          cb(null, true)
        }
      })
    }
    else if(uid == self.uid){
      cb(null, true)
    }
    else{
      cb(null, false)
    }
  })
}

Account.prototype.preferredAlias = function(alias){
  var self = this
  self.preferredAlias = alias
  self.aliases.push(alias)
  return this
}

Account.prototype.fetch = function(cb){
  var self = this

  db.get('alias/'+self.id, function (err, uid) {
    console.log('fetch get err: ', err)
    if(uid){
      self.uid = uid
      db.get(uid, function(err, accountData){
        if(err) cb(err)
        else{
          cb(null, accountData)
        }
      })
    }
    else{
      self.uid = self.id
      cb('Alias does not exist')
    }
  })
}

Account.prototype.pocketAuth = function(accessToken){
  var self = this
  self.data.pocket = self.data.pocket || {}
  self.data.pocket.accessToken = accessToken
  return this
}

Account.prototype.follow = function(service, follows){
  this.data.follows = this.data.follows || {}
  this.data.follows[service] = follows
  return this
}

Account.prototype.authenticate = function(password, cb){
  var validateCb = cb
  this.fetch(function(err, accountData){
    if(err) validateCb(err)
    else validateCb(null, accountData)
  })
}

module.exports = function(id){
  return new Account(id)
}

module.exports.db = db

