const express = require('express');
const router = express.Router()
const categoriesController = require('../controllers/CategoriesController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/createCategory', categoriesController.createCategory)
router.put('/updateCate/:id', categoriesController.updateCategory)
router.get('/getDetails-Cate/:id', categoriesController.getDetailsCategory)
router.delete('/deleteCate/:id',categoriesController.deleteCategory)

module.exports = router