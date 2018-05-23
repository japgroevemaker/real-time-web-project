var socket = io();

var allLanguages = []

var checked = "all"

// Making a language filter
    function displaySingleCountry(){
      // Checks id
      var that = this.id,
        activeLang = document.querySelector("#language div.div-active")
        // Checks if a language is active
        if(activeLang) {
          // If active remove class
          activeLang.classList.remove('div-active')
        }
        // Looping trough sections
      for (var i = 0; i < document.querySelectorAll("#tweets section").length; i++) {
        // Adding a class
        document.querySelectorAll("#tweets section")[i].classList.add("none")
        // Checks if element contains class that
        if (document.querySelectorAll("#tweets section")[i].classList.contains(that)) {
          checked = that
          document.querySelectorAll("#tweets section")[i].classList.remove("none")
          document.querySelector("#language div#"+that).classList.add('div-active')
        }
      }
    }

// Making the clear button
document.querySelector("button").addEventListener("click", function(){
  checked = "all"
  for (var i = 0; i < document.querySelectorAll("#tweets section").length; i++) {
    document.querySelectorAll("#tweets section")[i].classList.remove("none")
  }
    var activeLang = document.querySelector("#language div.div-active")
    if(activeLang) {
      activeLang.classList.remove('div-active')
    }
})

socket.on('tweet', function(stream) {
  console.log(stream);

// Creating elements
  var container = document.getElementById('tweets')
  var tweetBox = document.createElement('section');
  tweetBox.classList.add(stream.lang)
    if (checked == "all") {
      console.log("handtekening");
    } else if (checked != stream.lang) {
      tweetBox.classList.add("none")
    }
  var leftSide = document.createElement('div');
  var rightSide = document.createElement('div');
  var user = document.createElement('h1');
  var userPic = document.createElement('img');
  var tweet = document.createElement('p');
  var langTweet = document.createElement('p');

  userPic.src = stream.user.profile_image_url;
  leftSide.style.backgroundColor = stream.user.profile_sidebar_fill_color;

// adding flags
  var userText = document.createTextNode('@' + stream.user.name);
  var tweetText = document.createTextNode(stream.text);
  if(stream.lang == "nl"){
    langTweet.innerHTML = "🇳🇱 "
  } else if (stream.lang == "en") {
    langTweet.innerHTML = "🇬🇧  "
  } else if (stream.lang == "tr") {
    langTweet.innerHTML = "🇹🇷 "
  } else if (stream.lang == "es") {
    langTweet.innerHTML = "🇪🇸 "
  } else if (stream.lang == "ja") {
    langTweet.innerHTML = "🇯🇵 "
  } else if (stream.lang == "pt") {
    langTweet.innerHTML = "🇵🇹 "
  } else if (stream.lang == "de") {
    langTweet.innerHTML = "🇩🇪 "
  } else if (stream.lang == "fr") {
    langTweet.innerHTML = "🇫🇷 "
  } else if (stream.lang == "it") {
    langTweet.innerHTML = "🇮🇹 "
  } else if (stream.lang == "ar") {
    langTweet.innerHTML = "🇸🇦 "
  } else if (stream.lang == "und") {
    langTweet.innerHTML = "?"
  } else{
    langTweet.innerHTML = "?"
    console.log("Nothing Foustream")
  }


  user.appendChild(userText);
  tweet.appendChild(tweetText);
  container.appendChild(tweetBox);
  tweetBox.appendChild(leftSide);
  tweetBox.appendChild(rightSide);
  leftSide.appendChild(userPic);
  leftSide.appendChild(user);
  rightSide.appendChild(tweet);
  rightSide.appendChild(langTweet);


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

// Making the language counter
  function push(tweetLang) {

    console.log("function push is a go");
    if (allLanguages.length == 0) {
      allLanguages[0] = {
        "lang": tweetLang,
        "count": 1
      }
      console.log(allLanguages);
      var langBut = document.getElementById("language").innerHTML += `
            <div id="${tweetLang}">
              <h1>${tweetLang}</h1>
              <p>${allLanguages[0].count}</p>
            </div>
          `

      var lastLang = document.querySelector( '#language > div' );
      lastLang.addEventListener("click", displaySingleCountry)
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
          },
          div = document.createElement( 'div' )
          div.id = tweetLang
          div.innerHTML = `
            <h1>${tweetLang}</h1>
            <p>${allLanguages[num].count}</p>
          `

          document.getElementById("language").appendChild( div )

            console.log( div )

            div.addEventListener("click", displaySingleCountry)
          searchFlag(allLanguages[num])

        }
      }
    }
  }
});
