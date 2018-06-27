var products = [{ id: 1, brand: "Nokia", model: "X6", price: 250, inStock: true },
{ id: 2, brand: "Samsung", model: "Galxy S8", price: 250, inStock: true },
{ id: 3, brand: "Samsung", model: "Galaxy S9", price: 750, inStock: false }];



var productCtrl = {

  get: function (req, res) {
    res.status(200);
    res.json(products);
  },

  getById: function (req, res) {

    var id = +req.params.id;
    var product;

    console.log(req.params);

    for (var i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        product = products[i];
      }
    }

    if (product) {
      res.status(200);
      res.json(product);
    }
    else {
      res.status(404); //Not found
      res.send("Not Found");
    }


  },

  save: function (req, res) {

    products.push(req.body);

    res.status(201); //Created
    res.send(req.body);
  },

  delete: function (req, res) {
    var id = +req.params.id;

    for (var i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1);
      }
    }

    res.status(204);  //No Content
    res.send();
  }

};


module.exports = productCtrl;