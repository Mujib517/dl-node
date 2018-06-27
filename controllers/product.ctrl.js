var products = [{ id: 1, brand: "Nokia", model: "X6", price: 250, inStock: true },
{ id: 2, brand: "Samsung", model: "Galxy S8", price: 250, inStock: true },
{ id: 3, brand: "Samsung", model: "Galaxy S9", price: 750, inStock: false }];



var productCtrl = {

  get: function (req, res) {
    res.status(200);
    res.json(products);
  },

  getById: function (req, res) {

    var id = req.params.id;
    var product;

    for (var i = 0; i < products.length; i++) {
      if (products[i].id == id) {
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


  }
};


module.exports = productCtrl;