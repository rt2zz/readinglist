var request = require('request')
module.exports.a = function(req, res){
  var opts = {
    form: {
      a: 'aa',
      b: 'bb'
    },
    json: true
  }
  request.post('http://localhost:8001/twitter/setup', opts, function(e, r, body){
    console.log(body)
    res.end('yo')
  })
}