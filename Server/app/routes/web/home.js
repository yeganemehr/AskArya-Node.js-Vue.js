const express = require('express');
const router = express.Router();

const userController = require('app/http/controllers/userController');

router.get('/user/activation/:code', userController.activation);

module.exports = router;
