# Laya Store - Node.js Express API

A complete Node.js Express application built with clean architecture principles, featuring JWT authentication, comprehensive error handling, and robust testing.

## 🚀 Features

- **Clean Architecture**: Well-structured codebase following separation of concerns
- **JWT Authentication**: Secure user registration and login system
- **Input Validation**: Comprehensive request validation using Joi
- **Error Handling**: Global error handling with custom error classes
- **Security**: Helmet, CORS, rate limiting, and password hashing
- **Testing**: Unit and integration tests with Jest
- **Code Quality**: ESLint and Prettier for consistent code formatting
- **Database**: MongoDB with Mongoose ODM
- **Environment Configuration**: Secure environment variable management

## 📁 Project Structure

```
laya-store/
├── src/
│   ├── config/
│   │   ├── database.js          # Database connection configuration
│   │   └── index.js             # Environment variables and app config
│   ├── controllers/
│   │   └── authController.js    # Authentication request handlers
│   ├── middlewares/
│   │   ├── auth.js              # JWT authentication middleware
│   │   ├── errorHandler.js      # Global error handling middleware
│   │   └── validation.js        # Request validation schemas
│   ├── models/
│   │   └── User.js              # User database model
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   └── index.js             # Main route handler
│   ├── services/
│   │   └── authService.js       # Authentication business logic
│   ├── tests/
│   │   ├── integration/         # Integration tests
│   │   ├── unit/                # Unit tests
│   │   └── setup.js             # Test configuration
│   ├── utils/
│   │   ├── AppError.js          # Custom error class
│   │   ├── catchAsync.js        # Async error wrapper
│   │   └── response.js          # API response utilities
│   └── app.js                   # Express app configuration
├── server.js                    # Server bootstrap file
├── package.json                 # Dependencies and scripts
├── .eslintrc.js                 # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── .gitignore                   # Git ignore rules
├── .env.example                 # Environment variables template
├── jest.config.js               # Jest testing configuration
└── README.md                    # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd laya-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/laya_store

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d

# Other Configuration
BCRYPT_SALT_ROUNDS=12
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For local MongoDB installation
mongod

# Or use MongoDB Atlas cloud service
# Update MONGODB_URI in .env with your Atlas connection string
```

### 5. Run the Application

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /auth/profile
Authorization: Bearer <jwt-token>
```

#### Update User Profile
```http
PATCH /auth/profile
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <jwt-token>
```

### Health Check
```http
GET /health
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Test Coverage
```bash
npm test -- --coverage
```

### Test Structure

- **Unit Tests**: Test individual components in isolation
  - Model tests (`src/tests/unit/models/`)
  - Service tests (`src/tests/unit/services/`)
  - Utility tests (`src/tests/unit/utils/`)

- **Integration Tests**: Test API endpoints end-to-end
  - Authentication flow tests (`src/tests/integration/`)

## 🔧 Development

### Code Formatting

```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

### Project Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run lint       # Check code quality
npm run lint:fix   # Fix linting issues
npm run format     # Format code with Prettier
```

## 🔒 Security Features

- **Password Hashing**: Bcrypt with configurable salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents brute force attacks
- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Secure error responses (no sensitive data leakage)

## 🏗️ Architecture Patterns

### Clean Architecture
- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Models**: Define data structure and database interactions
- **Middlewares**: Handle cross-cutting concerns
- **Utils**: Reusable utility functions

### Error Handling
- Custom `AppError` class for operational errors
- Global error handling middleware
- Environment-specific error responses
- Async error catching wrapper

### Validation
- Joi schemas for request validation
- Centralized validation middleware
- Detailed error messages

## 🚀 Deployment

### Environment Variables for Production

Ensure these environment variables are set in production:

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=<your-production-mongodb-uri>
JWT_SECRET=<strong-random-secret>
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
```

### Production Considerations

1. **Database**: Use MongoDB Atlas or a managed MongoDB service
2. **Environment**: Set `NODE_ENV=production`
3. **Security**: Use strong JWT secrets and HTTPS
4. **Monitoring**: Implement logging and monitoring solutions
5. **Process Management**: Use PM2 or similar for process management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify network connectivity

2. **JWT Token Issues**
   - Ensure JWT_SECRET is set in environment variables
   - Check token format in Authorization header: `Bearer <token>`

3. **Validation Errors**
   - Check request body format
   - Ensure all required fields are provided
   - Verify data types match schema requirements

4. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill the process using the port: `lsof -ti:3000 | xargs kill -9`

### Getting Help

- Check the [Issues](https://github.com/your-repo/issues) page
- Review the API documentation above
- Ensure all dependencies are installed correctly
- Verify environment variables are set properly

---

**Happy Coding! 🎉**
# laya-store-backend
