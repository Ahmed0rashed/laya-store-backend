require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const productRoutes = require('./routes/product.Routes');
const routes = require('./routes');
const { globalErrorHandler, notFound } = require('./middlewares/errorHandler');
const categoryRoutes = require('./routes/Category.Routes');
const cartRoutes = require('./routes/Cart.Routes');
const orderRoutes = require('./routes/Order.Routes');


const app = express();

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In production, specify your frontend domain
    if (process.env.NODE_ENV === 'production') {
      const allowedOrigins = [
        'https://your-frontend-domain.vercel.app',
        'https://your-custom-domain.com',
        // Add your production frontend URLs here
      ];
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    } else {
      // In development, allow all origins
      return callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  // In production, use more efficient logging
  app.use(morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
  }));
}

// API routes
app.use('/api/v1', routes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', cartRoutes);
app.use('/api/order', orderRoutes);
// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Laya Store API',
    version: '1.0.0',
    documentation: '/api/v1/health',
  });
});

// Health check endpoint for Vercel
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});


// Handle unhandled routes
app.all('*', notFound);

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
