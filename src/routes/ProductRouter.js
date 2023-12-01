const express = require('express');
const router = express.Router()
const productController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/createProduct',authMiddleware(['Admin', 'Seller']), productController.createProduct)
router.put('/updatePro/:id', authMiddleware(['Admin', 'Seller']), productController.updateProduct)
router.get('/getDetails-Pro/:id', productController.getDetailsProduct)
router.delete('/deletePro/:id',authMiddleware(['Admin', 'Seller']),  productController.deleteProduct)

module.exports = router