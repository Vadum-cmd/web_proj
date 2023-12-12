const express = require('express');
const router = express.Router();

// Common routes (e.g., home page, dashboard, etc.)
router.get('/', (req, res) => {
  res.render('index'); // Assuming you are using a template engine like EJS
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard'); // Assuming you are using a template engine like EJS
});


// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
