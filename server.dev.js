var spawn = require('child_process').spawn

var p = {
  web: spawn('node', ['serve.js'], {cwd: 'web'}),
  client: spawn('node', ['serve.js'], {cwd: 'client'}),
  articler: spawn('node', ['serve.js'], {cwd: 'articler'})
}


p.web.stdout.on('data', function (data) {
  console.log('web data: ' + data)
})

p.web.stderr.on('data', function (data) {
  console.log('web stderr: ' + data)
})

p.web.on('close', function (code) {
  console.log('web close with code ' + code);
})

p.client.stdout.on('data', function (data) {
  console.log('client data: ' + data)
})

p.client.stderr.on('data', function (data) {
  console.log('client stderr: ' + data)
})

p.client.on('close', function (code) {
  console.log('client close with code ' + code);
})

p.articler.stdout.on('data', function (data) {
  console.log('articler data: ' + data)
})

p.articler.stderr.on('data', function (data) {
  console.log('articler stderr: ' + data)
})

p.articler.on('close', function (code) {
  console.log('articler close with code ' + code);
})