const express = require('express');
const passport = require('passport');
const router = express.Router();
const users = require('../controllers/users');
const catchAsync = require('../utilities/catchAsync');

router
  .route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.registerNewUser));

router
  .route('/login')
  .get(users.renderLoginForm)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
    }),
    users.userLogin
  );

router.get('/logout', users.userLogout);

module.exports = router;
