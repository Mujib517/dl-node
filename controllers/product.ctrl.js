const Product = require('../models/product.model');

const productCtrl = {

  get: (req, res) => {

    //asynchronous
    Product.find(function (err, products) {

      //"",0,false,null,undefined,Nan.
      if (err) {
        res.status(500); //Internal Server Error
        //log
        res.send("Internal Server Error");  //Never send technical error messages
      }
      else {
        res.status(200);
        res.json(products);
      }


    });
  },

  getById: (req, res) => {

    let id = req.params.id;

    Product.findById(id, function (err, product) {
      if (product) {
        res.status(200);
        res.json(product);
      }
      else {
        res.status(404); //Not found
        res.send("Not Found");
      }
    });
  },

  save: (req, res) => {

    var product = new Product(req.body);

    product.save(function (err, savedProduct) {
      if (err) {
        res.status(500);
        res.send("Internal server error");
      }
      else {
        res.status(201); //Created
        res.json(savedProduct);
      }
    });


  },

  delete: (req, res) => {
    let id = req.params.id;

    Product.findByIdAndRemove(id, function (err) {
      if (err) {
        res.status(500);
        res.send(err);
      }
      else {
        res.status(204);  //No Content
        res.send();
      }
    })


  },

  update: (req, res) => {
    let id = req.params.id;

    //Deferred Execution
    Product.findByIdAndUpdate(id, {
      $set: {
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        inStock: req.body.inStock
      }
    }, function (err) {
      if (!err) {
        res.status(204);
        res.send();
      }
      else {
        res.status(500);
        res.send("Internal Server Error");
      }
    })



  },

  patch: (req, res) => {

    let id = req.params.id;
    delete req.body._id;

    Product.findById(id, function (err, product) {

      if (product) {
        for (var key in req.body) {
          product[key] = req.body[key];
        }

        Product.findByIdAndUpdate(id, product, function (err) {
          res.status(204);
          res.send();
        });
      }
      else {
        res.status(404);
        res.send("Not Found");
      }
    });
  }
};


module.exports = productCtrl;