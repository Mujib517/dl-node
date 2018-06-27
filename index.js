var express = require('express');
var bodyParser = require('body-parser');
//ES6 module pattern
//CommonJS

var app = express();

var defaultRouter = require('./routes/default.router');
var productRouter = require('./routes/product.router');

function cb() {
  console.log("Server is running on port 3000");
}

app.listen(3000, cb);

app.use(bodyParser.json());

app.use('/', defaultRouter);
app.use('/api/products', productRouter);
