const express = require('express');
const router = express.Router();
const CartController = require('../controllers/Cart.Controller');
// const { protect } = require('../middlewares/auth');

// Cart routes without authentication

// Cart routes
router.post('/addToCart', CartController.addToCart);
router.get('/cart', CartController.getCart);
router.patch('/cart/:itemId', CartController.updateCartItem);
router.delete('/cart/:itemId', CartController.removeFromCart);
router.delete('/cart', CartController.clearCart);
router.get('/cart/count', CartController.getCartCount);

module.exports = router;
