const Cart = require('../models/Cart.model');
const Product = require('../models/Product.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Add item to cart
exports.addToCart = catchAsync(async (req, res) => {
    const { productId, quantity = 1, variant, price, userId } = req.body;
    // Use provided userId or create a temporary one for demo purposes
    const user = userId || 'temp-user-123';

    // Check if product exists and is active
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
        throw new AppError('Product not found or not available', 404);
    }

    // Check stock availability
    if (product.stock < quantity) {
        throw new AppError('Insufficient stock available', 400);
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ user: user });
    
    if (!cart) {
        cart = await Cart.create({ user: user, items: [] });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
        item => item.product.toString() === productId && item.variant === variant
    );

    const itemPrice = price || product.price;

    if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].price = itemPrice;
    } else {
        // Add new item to cart
        cart.items.push({
            product: productId,
            quantity,
            variant,
            price: itemPrice
        });
    }

    // Calculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    await cart.save();

    // Populate product details for response
    await cart.populate('items.product', 'name price images');

    res.status(200).json({
        success: true,
        message: 'Item added to cart successfully',
        data: { cart }
    });
});

// Get user's cart
exports.getCart = catchAsync(async (req, res) => {
    const { userId } = req.query;
    const user = userId || 'temp-user-123';

    const cart = await Cart.findOne({ user: user })
        .populate('items.product', 'name price images stock isActive')
        .populate('user', 'name email');

    if (!cart) {
        return res.status(200).json({
            success: true,
            message: 'Cart is empty',
            data: { cart: { items: [], totalAmount: 0 } }
        });
    }

    // Filter out inactive products
    cart.items = cart.items.filter(item => item.product && item.product.isActive);
    
    // Recalculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    await cart.save();

    res.status(200).json({
        success: true,
        message: 'Cart retrieved successfully',
        data: { cart }
    });
});

// Update cart item quantity
exports.updateCartItem = catchAsync(async (req, res) => {
    const { itemId } = req.params;
    const { quantity, userId } = req.body;
    const user = userId || 'temp-user-123';

    if (quantity < 1) {
        throw new AppError('Quantity must be at least 1', 400);
    }

    const cart = await Cart.findOne({ user: user });
    if (!cart) {
        throw new AppError('Cart not found', 404);
    }

    const item = cart.items.id(itemId);
    if (!item) {
        throw new AppError('Item not found in cart', 404);
    }

    // Check stock availability
    const product = await Product.findById(item.product);
    if (!product || product.stock < quantity) {
        throw new AppError('Insufficient stock available', 400);
    }

    item.quantity = quantity;

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    await cart.save();

    await cart.populate('items.product', 'name price images stock');

    res.status(200).json({
        success: true,
        message: 'Cart item updated successfully',
        data: { cart }
    });
});

// Remove item from cart
exports.removeFromCart = catchAsync(async (req, res) => {
    const { itemId } = req.params;
    const { userId } = req.query;
    const user = userId || 'temp-user-123';

    const cart = await Cart.findOne({ user: user });
    if (!cart) {
        throw new AppError('Cart not found', 404);
    }

    const item = cart.items.id(itemId);
    if (!item) {
        throw new AppError('Item not found in cart', 404);
    }

    item.remove();

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    await cart.save();

    await cart.populate('items.product', 'name price images');

    res.status(200).json({
        success: true,
        message: 'Item removed from cart successfully',
        data: { cart }
    });
});

// Clear entire cart
exports.clearCart = catchAsync(async (req, res) => {
    const { userId } = req.query;
    const user = userId || 'temp-user-123';

    const cart = await Cart.findOne({ user: user });
    if (!cart) {
        throw new AppError('Cart not found', 404);
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    res.status(200).json({
        success: true,
        message: 'Cart cleared successfully',
        data: { cart }
    });
});

// Get cart count (number of items)
exports.getCartCount = catchAsync(async (req, res) => {
    const { userId } = req.query;
    const user = userId || 'temp-user-123';

    const cart = await Cart.findOne({ user: user });
    const itemCount = cart ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;

    res.status(200).json({
        success: true,
        message: 'Cart count retrieved successfully',
        data: { count: itemCount }
    });
});
