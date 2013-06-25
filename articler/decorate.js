module.exports = decorate

function decorate (req, res){
  res.json = function (obj, status) {
    res.send(JSON.stringify(obj), status, {'content-type':'application/json'})
  }
}