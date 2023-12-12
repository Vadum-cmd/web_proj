const User = require('../models/user.model');

exports.getUserHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch and return user's request history
    const history = user.requestHistory || [];
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
