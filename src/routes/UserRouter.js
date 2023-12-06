const express = require('express');
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)

router.put('/update-user/:id', authMiddleware(['Admin']), userController.updateUser)
router.delete('/delete-user/:id', authMiddleware(['Admin']), userController.deleteUser)

router.get('/getAll-user', authMiddleware(['Admin']), userController.getAllUser)

router.get('/getInfo/:id',userController.getInfo)


router.get('/getDetails-user/:id', userController.getDetailsUser)


router.post('/refresh-token', userController.refreshToken),

router.put('/update-cart/:id', authMiddleware(['Customer']), userController.updateCart),
router.delete('/delete-cart/:id', authMiddleware(['Customer']), userController.deleteCart),

router.put('/update-wishlist/:id', authMiddleware(['Customer']), userController.updateWishList),
router.delete('/delete-wishlist/:id', authMiddleware(['Customer']), userController.deleteWishList),

router.put('/update-transHis/:id', authMiddleware(['Customer']), userController.updateTransHis),
router.delete('/delete-transHis/:id', authMiddleware(['Customer']), userController.deleteTransHis),

module.exports = router