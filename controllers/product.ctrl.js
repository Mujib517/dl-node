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
    let product = req.body;
    let id = +req.params.id;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products[i].brand = product.brand;
        products[i].model = product.model;
        products[i].price = product.price;
        products[i].inStock = product.inStock;
      }
    }

    res.status(204);
    res.send();
  }

};


module.exports = productCtrl;