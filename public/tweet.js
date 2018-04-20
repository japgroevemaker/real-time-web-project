var socket = io.connect('http://localhost:3333');

// var tweet = document.createElement('p');
//     username = document.createElement('h1');
//
// document.body.appendChild(tweet);
// document.body.appendChild(username);

    socket.on('newTweet', function(data) {
      console.log(data);
      // tweet.innerHTML = "";
      // username.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
    });

// function createNode(element) {
//   return document.createElement(element);
// }
//
// function append(parent, el) {
//   return parent.appendChild(el);
// }
//
// var ul = document.getElementById('tweet');
//
// fetch('tweets.txt')
//   .then((resp) => resp.text())
//   .then(function(data){
//     console.log(data);
//     let tweet = data
//     return tweet.map(function(tweet) {
//       let p = createNode('p');
//       append(ul, p)
//     })
//   })
//
//   .catch(function(error) {
//
//   })
  // .then(response => response.text())
  // .then(text => console.log(text))

  // return authors.map(function(author) {
  //       let li = createNode('li'),
  //           img = createNode('img'),
  //           span = createNode('span');
  //       img.src = author.picture.medium;
  //       span.innerHTML = `${author.name.first} ${author.name.last}`;
  //       append(li, img);
  //       append(li, span);
  //       append(ul, li);
  //     })
  //   })
  //   .catch(function(error) {
  //     console.log(JSON.stringify(error));
  //   });
