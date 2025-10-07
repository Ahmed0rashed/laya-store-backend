
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/Category.Controller');


router.post('/createCategory', CategoryController.createCategory);
router.get('/getCategories', CategoryController.getCategories);
router.get('/getCategoryById/:id', CategoryController.getCategoryById);

module.exports = router;