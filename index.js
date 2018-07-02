const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//ES6 module pattern
//CommonJS

const app = express();

const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');

app.listen(3000, () => console.log("Server is running on port 3000"));


mongoose.connect("mongodb://localhost/dl-products", () => console.log("DB Connected"));

app.use(bodyParser.json());

app.use('/', defaultRouter);

//middleware

function authenticate(req, res, next) {

  let base64String = req.headers["authorization"].replace("Basic ", "");
  let decodedString = new Buffer(base64String, 'base64').toString(); // Ta-da

  let tokens = decodedString.split(":");

  let username = tokens[0];
  let password = tokens[1];

  if (username === "admin" && password === "password") next();
  else {
    res.status(401);
    res.send("Unauthorized");
  }
}


app.use(authenticate);

//private
app.use('/api/products', productRouter);
