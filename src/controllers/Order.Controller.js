const Order = require('../models/Order.model');
const Product = require('../models/Product.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
};

// Create order
exports.createOrder = catchAsync(async (req, res) => {
    const { firstName, lastName, email, items,shipping,discount ,phone,anotherPhone,address,city,state,zipCode } = req.body;

    if(!firstName || !lastName|| !items || !shipping  || !phone || !address || !city || !state ){
        throw new AppError('Please fill required fields', 400);
    }
    const orderNumber = generateOrderNumber();
    const pricing = {
        subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
        shipping: shipping,
        discount: discount,
        total: items.reduce((total, item) => total + item.price * item.quantity, 0) + shipping - discount
    };
    const shippingAddress = {
        name: firstName + ' ' + lastName,
        phone: phone,
        anotherPhone: anotherPhone,
        address: address,
        city: city,
        state: state,
        zipCode: zipCode
    };

    const order = await Order.create({ firstName, lastName, email, items, shippingAddress,orderNumber, pricing });
    res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: order
    });
});
  


