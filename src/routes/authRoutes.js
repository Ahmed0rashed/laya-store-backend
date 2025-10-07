const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { validate, registerSchema, loginSchema, updateProfileSchema } = require('../middlewares/validation');

const router = express.Router();

// Public routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

// Protected routes
router.use(protect); // All routes after this middleware are protected

router.get('/profile', authController.getProfile);
router.patch('/profile', validate(updateProfileSchema), authController.updateProfile);
router.post('/logout', authController.logout);

module.exports = router;
