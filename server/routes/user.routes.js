const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/history/:userId', UserController.getUserHistory);

module.exports = router;
