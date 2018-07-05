var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/product.ctrl');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    let filename = Date.now() + "-" + file.originalname;
    req.body.image = filename;
    cb(null, filename);
  }
});
const upload = multer({ storage: storage });

//HTTP GET domain.com/products
router.get('/:pageIndex/:pageSize', productCtrl.get);
router.get('/', productCtrl.get);
router.get('/:id', productCtrl.getById);
router.post('/', upload.single("image"), productCtrl.save);
router.delete('/:id', productCtrl.delete);
router.put('/:id', productCtrl.update);
router.patch('/:id', productCtrl.patch);

module.exports = router;