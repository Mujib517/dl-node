var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/product.ctrl');

//HTTP GET domain.com/products
router.get('/', productCtrl.get);
router.get('/:id', productCtrl.getById);
router.post('/', productCtrl.save);
router.delete('/:id', productCtrl.delete);
router.put('/:id', productCtrl.update);
router.patch('/:id', productCtrl.patch);

module.exports = router;