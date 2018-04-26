# real-time-web-project

This repo will hold the project you're going to build during the last two weeks of RTW. It functions as a way to show you've attained the following learning goals of this course:

* Build a Node Web App which consumes an external data source through an API and serves a frontend using routing and templating techniques.
* Create a "live" web app which reflects changes to the back-end data model in reactive front-end views, using real-time, event-based, messaging technologies like sockets or server-sent-events.
* Describe their work in a professional readme with insightful diagrams showing the life cycle of their data.

<!-- ☝️ replace this description -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Where do the 0️⃣s and 1️⃣s live in your project? What db system are you using?-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->

[Live demo](https://real-time-web-project-bmlhbvvxyk.now.sh)

# Concept
I'm using the Twitter API and the thing i want to do with it is that i'm searching tweets on GEO locations.
At the same time i'm tracking tweets in diffrent languages so you can see wich nationalities are on that particular locations.
So for example, i'm typing amsterdam as my location, at that point i can see how many nationalities are tweeting in Amsterdam.

## What did i do?
At first i installed [Twit](https://www.npmjs.com/package/twit). Then i needed to make an app where i could fix my authorisation keys. The next step was setting up an express server. When i did that, i included
```js
var Twit = require("twit")
```

In my express server. The next thing i did was getting acces to my created Twitter app.
```js
var T = new Twit({
  consumer_key:         '123124141234123124',
  consumer_secret:      'ksdhjahflauehfuiewh123127805',
  access_token:         ';WEHFkjhaskjdfhaslkfhslajhf',
  access_token_secret:  'aljsdbfahjsdfkhjasdfgkjhsadgfkhjasdgfU',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})
```

Then i needed to set on wich tweets i wanted to search. I created a [Bounding box](https://boundingbox.klokantech.com) and i putted it over the city center of Amsterdam and i putted the coordinates in a variabel.
```js
var Amsterdam = [4.858803,52.348957,4.936988,52.393874]
```
![Bounding box](https://github.com/japgroevemaker/real-time-web-project/blob/master/image/RTW1.jpg)

And then i putted the variabel in the params and i made sure that the params were streamed.

```js
var params = {
  locations: Amsterdam
}

var stream = T.stream('statuses/filter', params);
```
Then i setted up an localhost.
```js
var server = app.listen(3333, function() {
  console.log('Executed at port 3333');
});
```

The next thing i did was stream the data through ```socket``` This is how i did this.
```js
var io = socket(server);

io.on('connection', function(socket){
  console.log('user connected', socket.id);
  stream.on('tweet', function(tweet){
    console.log(tweet.text);
      io.sockets.emit('tweet', tweet)
    })
})
```
When this all was established i wanted to show the data in my console. At first i made an connection with ```socket```
```js
var socket = io.connect('http://localhost:3333');
```

Then i tried to stream the data to my console, i did that like this.
```js
socket.on('tweet', function(stream) {
  console.log(stream);
})
```
When this was working i started to create elements within my ```index.ejs```. When you open my website, you see a blank page with a discription at the top. When somebody sends a tweet in the city center of Amsterdam, it pops up. The code for that is like this.

```js
var container = document.getElementById('tweets')
var tweetBox = document.createElement('section');
var leftSide = document.createElement('div');
var rightSide = document.createElement('div');
var user = document.createElement('h1');
var userPic = document.createElement('img');
var tweet = document.createElement('p');

userPic.src = stream.user.profile_image_url;
leftSide.style.backgroundColor = stream.user.profile_sidebar_fill_color;

var userText = document.createTextNode('@' + stream.user.name);
var tweetText = document.createTextNode(stream.text);

user.appendChild(userText);
tweet.appendChild(tweetText);

container.appendChild(tweetBox);
tweetBox.appendChild(leftSide);
tweetBox.appendChild(rightSide);
leftSide.appendChild(userPic);
leftSide.appendChild(user);
rightSide.appendChild(tweet);
```
As you can see i add an element to the index everytime a tweet comes in.
The next thing i wanted to do was adding the function were the flag of the language the tweet was made in poped up. At first i made an function with an if else statement.
It looks like this.

```js
function push(tweetLang) {

  console.log("function push is a go");
  if (allLanguages.length == 0) {
    allLanguages[0] = {
      "lang": tweetLang,
      "count": 1
    }
    console.log(allLanguages);
    document.getElementById("language").innerHTML += `
          <div id="${tweetLang}">
            <h1>${tweetLang}</h1>
            <p>${allLanguages[0].count}</p>
          </div>
        `
    searchFlag(allLanguages[0])

  } else {
    var nope = 0
    for (var i = 0; i < allLanguages.length; i++) {
      if (allLanguages[i].lang == tweetLang) {
        console.log("lang bestaat al");
        allLanguages[i].count++
          document.querySelector(`#${allLanguages[i].lang} p:last-of-type`).innerHTML = allLanguages[i].count
        console.log(allLanguages);

      } else {
        nope++
      }
      if (nope == allLanguages.length) {
        console.log("nieuwe lang wordt toegevoegd");
        var num = allLanguages.length
        allLanguages[num] = {
          "lang": tweetLang,
          "count": 0
        }
        document.getElementById("language").innerHTML += `
                <div id="${tweetLang}">
                  <h1>${tweetLang}</h1>
                  <p>${allLanguages[num].count}</p>
                </div>
              `
        searchFlag(allLanguages[num])

      }
    }
  }
}
```
It looks for the language the tweet was made in and it checks if it is an new language or an existing one. When it is an new language it ads it to the counter, when it is an existing one, it is been counted by the existing language. When this worked, i wanted to show the flags of the nation the tweet was made in. I wanted to do this through an emoji api, but as i had an lack of time i did it with hard coding.
```js
function searchFlag(landCode) {
  console.log(landCode.lang);
  var land = document.querySelector(`#${landCode.lang} h1`)
  console.log(land);
  if (landCode.lang == "nl") {
    land.innerHTML = "🇳🇱 "
  } else if (landCode.lang == "en") {
    land.innerHTML = "🇬🇧  "
  } else if (landCode.lang == "tr") {
    land.innerHTML = "🇹🇷 "
  } else if (landCode.lang == "es") {
    land.innerHTML = "🇪🇸 "
  } else if (landCode.lang == "ja") {
    land.innerHTML = "🇯🇵 "
  } else if (landCode.lang == "pt") {
    land.innerHTML = "🇵🇹 "
  } else if (landCode.lang == "de") {
    land.innerHTML = "🇩🇪 "
  } else if (landCode.lang == "fr") {
    land.innerHTML = "🇫🇷 "
  } else if (landCode.lang == "it") {
    land.innerHTML = "🇮🇹 "
  } else if (landCode.lang == "ar") {
    land.innerHTML = "🇸🇦 "
  } else if (landCode.lang == "und") {
    land.innerHTML = "?"
  } else {
    console.log("Nothing Found");
  }
}
```
## Conclusion
I really learned a lot throughout this project. I learned a bit more about the use of ```sockets``` and the use of an real-time API and it isn't that difficult at all! I really enjoyed this project.

## Is there something i wanted to add?
Yes there is! As i explained above, i want to add an emoji API so that i can link that to the tweet language. I also would like to add an filter, that when i click on a flag it only displays the tweets in that particular language. But that is something for the future!
