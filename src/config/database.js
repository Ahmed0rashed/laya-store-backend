require('dotenv').config({ path: './config.env' });

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI ;
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};


module.exports = connectDB;
