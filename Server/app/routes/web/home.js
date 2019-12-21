const express = require('express');
const router = express.Router();

// Controllers
const userController = require('app/http/controllers/userController');

// Activation
router.get('/user/activation/:code', userController.activation);

module.exports = router;
