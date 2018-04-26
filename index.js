var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var app = express()
var socket = require("socket.io")
var Twit = require("twit")
var fs = require('fs');


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

var Amsterdam = [4.858803,52.348957,4.936988,52.393874]


var params = {
  locations: Amsterdam
}


var stream = T.stream('statuses/filter', params);

var server = app.listen(3333, function() {
  console.log('Executed at port 3333');
});

var io = socket(server);


io.on('connection', function(socket){
  console.log('user connected', socket.id);
  stream.on('tweet', function(tweet){
    console.log(tweet.text);
      io.sockets.emit('tweet', tweet)
    })
})


  io.on('disconnect', function(socket){
    console.log('user disconnec')
  })
