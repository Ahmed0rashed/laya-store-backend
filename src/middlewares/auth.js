const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Protect routes - require authentication
const protect = catchAsync(async (req, res, next) => {
  // 1) Get token from header
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('You are not logged in! Please log in to get access.', 401);
  }

  // 2) Verify token
  const decoded = authService.verifyToken(token);

  // 3) Check if user still exists
  const currentUser = await authService.getUserById(decoded.userId);

  // 4) Add user to request object
  req.user = { id: decoded.userId, ...currentUser };
  next();
});

// Restrict access to specific roles
const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new AppError('You do not have permission to perform this action', 403);
  }
  next();
};

module.exports = {
  protect,
  restrictTo,
};
