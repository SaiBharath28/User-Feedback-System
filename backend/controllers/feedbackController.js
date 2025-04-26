const Feedback = require('../models/Feedback');

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Public
exports.submitFeedback = async (req, res) => {
  try {
    const { userName, email, feedbackText, category } = req.body;
    
    const feedback = await Feedback.create({
      userName,
      email,
      feedbackText,
      category: category || 'suggestion'
    });

    res.status(201).json({
      success: true,
      data: feedback
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Public
exports.getFeedback = async (req, res) => {
  try {
    const { category, sort } = req.query;
    
    const query = {};
    if (category) {
      query.category = category;
    }

    let sortOption = '-createdAt'; // Default: newest first
    if (sort === 'oldest') {
      sortOption = 'createdAt';
    }

    const feedback = await Feedback.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: feedback.length,
      data: feedback
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};