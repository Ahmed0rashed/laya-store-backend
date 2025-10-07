const mongoose = require('mongoose');

// Setup test database
beforeAll(async () => {
  // Use test database
  const testDbUri = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/laya_store_test';
  
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(testDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

// Clean up after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
