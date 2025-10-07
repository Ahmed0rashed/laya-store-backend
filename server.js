require('dotenv').config({ path: './config.env' });

const app = require('./src/app');
const connectDB = require('./src/config/database');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Connect to database
connectDB().catch(err => {
  console.error('Failed to connect to database:', err);
  // In serverless, don't exit the process
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

// Start server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

const server = app.listen(port, () => {
  console.log(`Server running on port ${port} in ${env} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log(' SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log(' Process terminated!');
  });
});
