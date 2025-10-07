// do this file
const express = require('express');
const OrderController = require('../controllers/Order.Controller');
// const { protect } = require('../middlewares/auth');

const router = express.Router();


router.post('/createOrder', OrderController.createOrder);

module.exports = router;