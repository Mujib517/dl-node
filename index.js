const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//ES6 module pattern
//CommonJS

const app = express();

const config = require('./config');
const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');
const middlewares = require("./middlewares");
const userRouter = require('./routes/user.router');
const reviewRouter = require('./routes/review.router');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server is running on port 3000"));

mongoose.connect(config.conStr, () => console.log("DB Connected"));

app.use(express.static('uploads/'));

app.use(bodyParser.json());

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    let filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

app.use('/', defaultRouter);

//middleware
app.use('/api/users', userRouter);
//basic auth
//app.use(middlewares.authenticate);
//app.use(middlewares.tokenAuth);

//private
app.use('/api/products', productRouter);
app.use('/api/reviews', reviewRouter);
