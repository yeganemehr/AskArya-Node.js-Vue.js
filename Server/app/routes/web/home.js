const express = require('express');
const router = express.Router();

// Controllers

const userController = require('app/http/controllers/userController');

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.clearCookie('remember_token');
//   res.redirect('/');
// });

router.get('/user/activation/:code', userController.activation);

module.exports = router;
