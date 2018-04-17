var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var app = express()
var socket = require("socket.io")
var Twit = require("twit")
var TwitterStream = require('twitter-stream-api')
var fs = require('fs');

//static files

app.set('view engine', 'ejs')

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.render("index");
})

// var keys = {
//     consumer_key : "roz8tFgK8w9elwL1K8dmpZSlt",
//     consumer_secret : "mrIwaSIUK9LcIT5wYiujA2WNXWMJPvoupqHRVnf3TXMsPY7805",
//     token : "741148952851034112-ETDOWGB8P1fkOLcf02Y28szagRBSYds",
//     token_secret : "aB3fNVspjonDDXUVERns9ElHnPebJ9eQ3G8LeTTzRMLaU"
// };
//
// var Twitter = new TwitterStream(keys, false);
// Twitter.stream('statuses/filter', {
//     track: 'javascript'
// });
//
// Twitter.pipe(fs.createWriteStream('tweets.json'));

var T = new Twit({
  consumer_key:         'roz8tFgK8w9elwL1K8dmpZSlt',
  consumer_secret:      'mrIwaSIUK9LcIT5wYiujA2WNXWMJPvoupqHRVnf3TXMsPY7805',
  access_token:         '741148952851034112-ETDOWGB8P1fkOLcf02Y28szagRBSYds',
  access_token_secret:  'aB3fNVspjonDDXUVERns9ElHnPebJ9eQ3G8LeTTzRMLaU',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

// var params = {
//   q: "PSV since:2018-04-16",
//   count: 1
// }

var stream = T.stream('statuses/filter', { track: ['the'] })

stream.on('tweet', function (tweet){
  console.log(tweet);
})

// function gotData(err, data, response) {
//   console.log(data.statuses[0].text);
// }

// T.get('search/tweets', params, gotData);
stream.on('tweet', function (tweet, stream, gotData){
  // console.log(data.statuses[0].text);
})

var server = app.listen(3333, function() {
  console.log('Executed at port 3333');
});

// var io = socket(server);
