const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const config = require('./config');
const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');
const middlewares = require("./middlewares");
const userRouter = require('./routes/user.router');
const reviewRouter = require('./routes/review.router');
const requestLogger = require('./utilities/request.logger');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server is running on port 3000"));

mongoose.connect(config.conStr, () => console.log("DB Connected"));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.static('uploads/'));
app.use(requestLogger);
app.use(bodyParser.json());

app.use('/', defaultRouter);
//middleware
app.use('/api/users', userRouter);
//app.use(middlewares.tokenAuth);

//private
app.use('/api/products', productRouter);
app.use('/api/reviews', reviewRouter);
