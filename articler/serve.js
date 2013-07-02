var http = require('http')
var director = require('director')

var tStream = require('./tstream.js')
var decorate = require('./decorate.js')
var Articles = require('./models/articles.js')

var router = new director.http.Router({});

var server = http.createServer(function (req, res) {
  //parse body
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString())
  });

  decorate(req, res);
  console.log(res.json)
  console.log('incomin!')
  router.dispatch(req, res, function (err) {
    if (err) {
      console.log('ERRRRR', err)
      res.writeHead(404);
      res.end();
    }
  });
});

router.get('/twitter', helloWorld);
router.post('/twitter/setup', twitterSetup);
router.post('/list', listArticles);


function helloWorld (){
  console.log('hello')
  this.res.end('yooo')
}

function twitterSetup(){
  var self = this
  tStream.process(this.req.body.follows, this.req.body.oauth, function(err, data){
    console.log('returning')
    self.res.json(data)
  })
}

function listArticles(){
  var self = this
  var sources = this.req.body.sources
  Articles(sources).list(function(err, articles){
    self.res.json({articles: articles})
  })
}

require('./admin.js')

server.listen(3003);