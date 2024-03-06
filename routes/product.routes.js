const express = require('express')
const router = express.Router();
const path = require('path')
const productController = require('../controller/Product.controller')
// getting error in the path 
// const productController = require(path.join(__dirname, 'controllers', 'product.controller'))
// get all products
router.get('/', productController.getAllProducts);

// get Single Product by ID
router.get('/:id', productController.getProductById)

// get Single Product by ID and update
router.put('/update/:id', productController.getProductByIdUpdate);
// create Product
router.post('/', productController.createProduct);
// bulk
router.post('/bulk', productController.addMultipleProducts);
// delete Product
router.delete('/:id', productController.deleteProduct)
// get product by url
router.get('/url/:url', productController.productbyurl)
module.exports = router;
