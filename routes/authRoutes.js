const express   = require('express');
const router    = express.Router();
const { check } = require('express-validator');

const AuthController = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post(
    '/register',
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please enter a valid Email').isEmail(),
      check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
      check('role', 'Role must be either organizer or attendee').isIn(['organizer', 'attendee']),
    ],
    AuthController.register
  );
  
  // @route   POST /api/auth/login
  // @desc    Authenticate user & get token
  // @access  Public
  router.post(
    '/login',
    [
      check('email', 'Please enter a valid Email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    AuthController.login
  );
  
  module.exports = router;

