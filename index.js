const express = require('express');
const bodyParser = require('body-parser');
//ES6 module pattern
//CommonJS

const app = express();

const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');

app.listen(3000, () => console.log("Server is running on port 3000"));

app.use(bodyParser.json());

app.use('/', defaultRouter);
app.use('/api/products', productRouter);
