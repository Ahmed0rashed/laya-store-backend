
const Category = require('../models/Category.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const slugify = require('slugify');

exports.createCategory = catchAsync(async (req, res) => {
    const { name, description, parent } = req.body;
    const slug = slugify(name, { lower: true });
    const category = await Category.create({ name, description, parent ,slug});
    res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: category
    });
});

// get categories
exports.getCategories = catchAsync(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        success: true,
        message: 'Categories retrieved successfully',
        data: categories
    });
});

exports.getCategoryById = catchAsync(async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Category retrieved successfully',
        data: category
    });
});
