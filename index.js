var express = require('express');
//ES6 module pattern
//CommonJS

var app = express();

var productCtrl = require('./controllers/product.ctrl');
var defaultCtrl = require('./controllers/default.ctrl');

function cb() {
  console.log("Server is running on port 3000");
}

app.listen(3000, cb);

app.get('/', defaultCtrl.get);
app.get('/health', defaultCtrl.health);

app.get('/products', productCtrl.get);
