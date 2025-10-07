const express = require('express');
const productController = require('../controllers/Product.Controller');
const { multerUpload } = require('../middlewares/cloudinary');

const router = express.Router();

router.post('/createProduct',multerUpload.array('images', 5), productController.createProduct);4

router.get('/getProducts', productController.getProducts);
router.post('/upload-images', multerUpload.array('images', 5), productController.uploadImages);
router.get('/getProductById/:id', productController.getProductById);
router.get('/getProductByCategoryId/:id', productController.getProductByCategoryId);
router.get('/getBestSellerProducts', productController.getBestSellerProducts);



module.exports = router;
