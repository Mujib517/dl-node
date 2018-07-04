const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//ES6 module pattern
//CommonJS

const app = express();

const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');
const middlewares = require("./middlewares");
const userRouter = require('./routes/user.router');
const reviewRouter = require('./routes/review.router');

app.listen(3000, () => console.log("Server is running on port 3000"));


mongoose.connect("mongodb://localhost/dl-products", () => console.log("DB Connected"));

app.use(bodyParser.json());

app.use('/', defaultRouter);

//middleware

app.use('/api/users', userRouter);
//basic auth
//app.use(middlewares.authenticate);
//app.use(middlewares.tokenAuth);

//private
app.use('/api/products', productRouter);
app.use('/api/reviews', reviewRouter);
