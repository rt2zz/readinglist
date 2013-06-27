## StyleWriter
Simple module to convert styl files to css files and write the css file to disk.

### Example 
Typical usage in a http route.  If a stream is passed as a second argument, the compiled css will be streamed out.
```js
var stylwriter = require('stylwriter')
function(req, res){
  stylewriter('styles.styl', res)
}
```

### @TODO
Tests
Configuraiton Options (e.g. output file name)
Dev options (control over caching)

