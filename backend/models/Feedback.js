const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  feedbackText: {
    type: String,
    required: [true, 'Please provide feedback text'],
    trim: true,
    maxlength: [1000, 'Feedback cannot be more than 1000 characters']
  },
  category: {
    type: String,
    enum: ['suggestion', 'bug', 'feature', 'other'],
    default: 'suggestion'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);