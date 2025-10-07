const Product = require('../models/Product.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const slugify = require('slugify');
const { upload } = require('../middlewares/cloudinary');

// Create product
exports.createProduct = catchAsync(async (req, res) => {
    const { name, description, price, stock, category, brand, tags, isFeatured, isActive ,oldPrice,isBestSeller} = req.body;
    let images = [];
    if (req.files && req.files.length > 0) {
        const uploadedImages = await Promise.all(req.files.map(async (file) => {
            return await upload(file.buffer, 'image');
        }));
        images = uploadedImages.map((imageUrl, index) => ({
            url: imageUrl,
            alt: `${name} image ${index + 1}`,
            isMain: index === 0
        }));
    }

    const slug = slugify(name, { lower: true });
    const data = { name, description, price, stock, category, brand, images, tags, isFeatured, isActive, slug,oldPrice,isBestSeller };
    const product = await Product.create(data);
    
    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: { product }
    });
    
});

// Get products with pagination
exports.getProducts = catchAsync(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    const total = await Product.countDocuments();
    const totalPages = Math.ceil(total / limit);
    const products = await Product.find().skip(skip).limit(limit);
    
    res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        data: {
            products,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalProducts: total,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        }
    });
});

// upload images
exports.uploadImages = catchAsync(async (req, res) => {
    if (!req.files || req.files.length === 0) {
        throw new AppError('No images provided', 400);
    }
    
    const uploadedImages = await Promise.all(req.files.map(async (file) => {
        return await upload(file.buffer, 'image');
    }));
    
    res.status(200).json({
        success: true,
        message: 'Images uploaded successfully',
        data: { images: uploadedImages }
    });
});

// get product by id
exports.getProductById = catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        data: product
    });
});

exports.getProductByCategoryId = catchAsync(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments({ category: req.params.id });
    const totalPages = Math.ceil(total / limit);
    const products = await Product.find({ category: req.params.id }).skip(skip).limit(limit);
    res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        data: products,
        pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalProducts: total,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        }
    });
});

exports.getBestSellerProducts = catchAsync(async (req, res) => {
    const products = await Product.find({ isBestSeller: true });
    res.status(200).json({
        success: true,
        message: 'Best seller products retrieved successfully',
        data: products
    });
});