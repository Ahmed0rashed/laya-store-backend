const express = require('express');
const OrderController = require('../controllers/Order.Controller');
// const { protect } = require('../middlewares/auth');

const router = express.Router();


// Order routes
router.post('/createOrder', OrderController.createOrder);

module.exports = router;