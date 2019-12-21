const express = require('express');
const router = express.Router();

// Middlewares
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');

// Home Router
const homeRouter = require('app/routes/web/home');
router.use('/', homeRouter);

// Auth Router
const authRouter = require('app/routes/web/auth');
router.use('/auth', redirectIfAuthenticated.handle, authRouter);

module.exports = router;
