const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

class AuthController {
  // Register new user
  register = catchAsync(async (req, res) => {
    const { name, email, password, role } = req.body;

    const result = await authService.register({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  });

  // Login user
  login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  });

  // Get current user profile
  getProfile = catchAsync(async (req, res) => {
    const user = await authService.getUserById(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: { user },
    });
  });

  // Update user profile
  updateProfile = catchAsync(async (req, res) => {
    const user = await authService.updateProfile(req.user.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user },
    });
  });

  // Logout (client-side token removal)
  logout = catchAsync(async (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  });
}

module.exports = new AuthController();
