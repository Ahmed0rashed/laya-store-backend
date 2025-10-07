require('dotenv').config({ path: './config.env' });

const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const AppError = require('../utils/AppError');

class AuthService {
  // Generate JWT token
  generateToken(userId) {
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
    return jwt.sign({ userId }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });
  }

  // Verify JWT token
  verifyToken(token) {
    try {
      const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
      return jwt.verify(token, jwtSecret);
    } catch (error) {
      throw new AppError('Invalid or expired token', 401);
    }
  }

  // Register new user
  async register(userData) {
    const { name, email, password, role } = userData;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new AppError('User already exists with this email', 400);
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || 'user',
    });

    await user.save();

    // Generate token
    const token = this.generateToken(user._id);

    return {
      token,
      user: user.getPublicProfile(),
    };
  }

  // Login user
  async login(email, password) {
    // Find user and include password for comparison
    const user = await User.findByEmail(email).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AppError('Account is deactivated', 401);
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = this.generateToken(user._id);

    return {
      token,
      user: user.getPublicProfile(),
    };
  }

  // Get user by ID
  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (!user.isActive) {
      throw new AppError('Account is deactivated', 401);
    }

    return user.getPublicProfile();
  }

  // Update user profile
  async updateProfile(userId, updateData) {
    const allowedUpdates = ['name', 'email'];
    const updates = {};

    // Filter allowed updates
    Object.keys(updateData).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    });

    if (Object.keys(updates).length === 0) {
      throw new AppError('No valid updates provided', 400);
    }

    // Check if email is being updated and is unique
    if (updates.email) {
      const existingUser = await User.findByEmail(updates.email);
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new AppError('Email already in use', 400);
      }
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user.getPublicProfile();
  }
}

module.exports = new AuthService();
