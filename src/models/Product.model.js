const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },
    oldPrice: {
      type: Number,
      min: 0
    },
    comparePrice: {
      type: Number,
      min: 0
    },
    sku: {
      type: String,

    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    brand: String,
    images: [{
      url: String,
      alt: String,
      isMain: Boolean
    }],
    
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
      ratings: {
        average: {
          type: Number,
          default: 0,
          min: 0,
          max: 5
        },
        count: {  
          type: Number,
          default: 0
        }
      },
      tags: [String],
      isFeatured: {
        type: Boolean,
        default: false
      },
    isActive: {
      type: Boolean,
      default: true
    },
    isBestSeller: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  });
  
  productSchema.index({ name: 'text', description: 'text', tags: 'text' });
  
  module.exports = mongoose.model('Product', productSchema);
  
