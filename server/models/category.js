const mongoose = require('mongoose');

// Our Schema
const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);