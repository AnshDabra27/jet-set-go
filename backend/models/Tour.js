const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  maxGroupSize: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'difficult']
  },
  image: {
    type: String,
    required: true
  },
  startDates: [{
    type: Date,
    required: true
  }],
  location: {
    type: String,
    required: true
  },
  highlights: [{
    type: String
  }],
  included: [{
    type: String
  }],
  notIncluded: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tour', tourSchema); 