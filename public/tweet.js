var socket = io();

var allLanguages = []

socket.on('tweet', function(stream) {
  console.log(stream);

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


  push(stream.lang)

  var langs = " "
  langs += stream.lang + "."

  console.log(langs);

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
});
