module.exports = decorate


function decorate (req, res){

  res.send = function (data, status, headers) {
    res.statusCode = res.statusCode || status
    if (headers) Object.keys(headers).forEach(function (h) {
      res.setHeader(h, headers[h])
    })
    if (!Buffer.isBuffer(data)) data = new Buffer(data)
    res.setHeader('content-length', data.length)
    res.end(data)
  }
  
  res.json = function (obj, status) {
    res.send(JSON.stringify(obj), status, {'content-type':'application/json'})
  }
}