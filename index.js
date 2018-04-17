var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var app = express()
var socket = require("socket.io")
var Twit = require("twit")


//static files

app.set('view engine', 'ejs')

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.render("index");
})


var T = new Twit({
  consumer_key:         'roz8tFgK8w9elwL1K8dmpZSlt',
  consumer_secret:      'mrIwaSIUK9LcIT5wYiujA2WNXWMJPvoupqHRVnf3TXMsPY7805',
  access_token:         '741148952851034112-ETDOWGB8P1fkOLcf02Y28szagRBSYds',
  access_token_secret:  'aB3fNVspjonDDXUVERns9ElHnPebJ9eQ3G8LeTTzRMLaU',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

var params = {
  track: 'Amsterdam',
  language: 'nl'
}

var stream = T.stream('statuses/filter', params);

stream.on('tweet', function (tweet){
  if (tweet.retweeted_status) {
    console.log("");
    console.log("Retweet");
    console.log("");
    if (tweet.retweeted_status.extended_tweet){
      console.log(tweet.retweeted_status.extended_tweet.full_text);
    } else {

      console.log(tweet.text);
    }
  }

  else {
    console.log("");
    console.log('Tweet');
    console.log("");
    console.log(tweet.text);
  }
});

stream.on('tweet', function (tweet, stream, gotData){
})

var server = app.listen(3333, function() {
  console.log('Executed at port 3333');
});

// var io = socket(server);
