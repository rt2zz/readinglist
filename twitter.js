var twitter = require('ntwitter');

var twit = new twitter({
  consumer_key: 'J2XcZYlBFU0hjrt4ooYqWg',
  consumer_secret: 'vbh21yfR9VbI80BapiswGi6IsfuAYwUYPIOwjjQqvM',
  access_token_key: '501028204-GGRY06ubV2U4tf4HBCBUUaRqwzMWKQQS9aWAz2qU',
  access_token_secret: '6kLvzHVDyRsZok8FagW8csFNVk9KCtVOB3gmwjTFnXg'
});

twit.stream('statuses/filter', {'track':'twitter'}, function(stream) {
  stream.on('data', function (data) {
    console.log(data);
  });
  stream.on('end', function (data) {
    console.log('ENDING', data);
  });
  stream.on('destroy', function (data) {
    console.log('DESTROYING', data);
  });
});