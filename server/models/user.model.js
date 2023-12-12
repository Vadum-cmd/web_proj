const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  requestHistory: [
    {
      timestamp: { type: Date, default: Date.now },
      matrixSize: { type: Number, required: true },
      result: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
