const express = require('express');
const router = express.Router();
const passport = require('../authentication'); // Import the shared authentication logic

// Server-specific authentication routes
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
