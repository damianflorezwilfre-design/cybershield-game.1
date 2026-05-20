const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  levelId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  requiredXp: {
    type: Number,
    default: 0
  },
  maxScore: {
    type: Number,
    default: 1000
  }
}, { timestamps: true });

module.exports = mongoose.model('Level', levelSchema);
