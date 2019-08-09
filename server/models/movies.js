const mongoose = require('mongoose');

// Our Schema
const MoviesSchema = new mongoose.Schema({
 categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  title: {
    type: String,
    required: false
  },
  year: {
    type: String,
    required: false
  },
  director: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  photoUrl: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movies', MoviesSchema);