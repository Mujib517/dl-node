var productCtrl = {

  get: function (req, res) {

    var products = [{ id: 1, brand: "Nokia", model: "X6", price: 250, inStock: true },
    { id: 2, brand: "Samsung", model: "Galxy S8", price: 250, inStock: true },
    { id: 3, brand: "Samsung", model: "Galaxy S9", price: 750, inStock: false }];

    res.status(200);
    res.json(products);
  }
};


module.exports = productCtrl;