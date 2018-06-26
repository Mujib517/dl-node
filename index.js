//common js module pattern
//es6 module pattern
// import {Component} from '@angular/core';
//7 times faster
//hoisting
//routing
// 3 parts
// part 1: Writing api. MEAN ( Mongodb, Express, NodeJS , Angular)
// part 2: Writing mvc 
// part 3: Chat 

var http = require('http');
var fs = require('fs');

function handleRequests(req, res) {

  switch (req.url) {
    case '/':

      var contents = fs.readFileSync("index.html");


      res.write(contents);
      res.end();
      break;

    case '/books':

      var books = [{
        id: 1,
        name: "Speaking JS",
        author: "Author 1",
        price: 100
      }, {
        id: 2,
        name: "Eloquent JS",
        author: "Author 2",
        price: 120
      }, {
        id: 3,
        name: "HeadFirst JS",
        author: "Author 3",
        price: 150
      }];

      res.write(JSON.stringify(books));
      res.end();
      break;

    case '/authors':
      res.write("List of authors");
      res.end();
      break;

    default:
      res.write("NodeJS");
      res.end();
      break;
  }


}

var server = http.createServer(handleRequests);

server.listen(3000, callback);

function callback() {
  console.log("Server is running on 3000");
}
