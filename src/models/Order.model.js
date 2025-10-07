require('dotenv').config({ path: './config.env' });

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   default: null
  // },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
  }],
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    address: String,
    zipCode: String,
    phone: String,
    anotherPhone: String,
  },
  billingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  pricing: {
    subtotal: {
      type: Number,
      required: true
    },
    shipping: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  // payment: {
  //   method: {
  //     type: String,
  //     enum: ['card', 'paypal', 'cod', 'bank_transfer'],
  //     required: true
  //   },
  //   status: {
  //     type: String,
  //     enum: ['pending', 'completed', 'failed', 'refunded'],
  //     default: 'pending'
  //   },
  //   transactionId: String,
  //   paidAt: Date
  // },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: String,
  statusHistory: [{
    status: String,
    note: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
