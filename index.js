var express = require('express');
//ES6 module pattern
//CommonJS

var app = express();

var defaultRouter = require('./routes/default.router');
var productRouter = require('./routes/product.router');

function cb() {
  console.log("Server is running on port 3000");
}

app.listen(3000, cb);

// app.get('/', defaultCtrl.get);
// app.get('/health', defaultCtrl.health);

app.use('/', defaultRouter);
app.use('/', productRouter);
// app.get('/products', productCtrl.get);
