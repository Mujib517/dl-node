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
app.use('/api/products', productRouter);
