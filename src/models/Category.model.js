const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    description: String,
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    },
    image: String,
    isActive: {
      type: Boolean,
      default: true
    }
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('Category', categorySchema);