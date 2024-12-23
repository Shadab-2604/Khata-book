const mongoose = require('mongoose');

const HisaabSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isEncrypted: {
    type: Boolean,
    default: false
  },
  encryptedData: {
    type: String
  }
});

module.exports = mongoose.model('Hisaab', HisaabSchema);

