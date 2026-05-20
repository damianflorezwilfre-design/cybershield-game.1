const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  levelId: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  },
  timeSpent: {
    type: Number, // En segundos
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
