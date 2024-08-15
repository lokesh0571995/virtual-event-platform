const express   = require('express');
const router    = express.Router();
const { check } = require('express-validator');

const EventController = require('../controllers/eventController');
const auth = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', EventController.getAllEvents);

// @route   POST /api/events
// @desc    Create an event
// @access  Organizer only
router.post(
  '/',
  auth,
  authorizeRoles('organizer'),
  [
    check('title', 'Title is required').not().isEmpty(),
    check('date', 'Please include a valid date').isISO8601(),
  ],
  EventController.createEvent
);

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Organizer only
router.put(
  '/:id',
  auth,
  authorizeRoles('organizer'),
  [
    check('title', 'Title is required').not().isEmpty(),
    check('date', 'Please include a valid date').isISO8601(),
  ],
  EventController.updateEvent
);

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Organizer only
router.delete('/:id', auth, authorizeRoles('organizer'), EventController.deleteEvent);

// @route   POST /api/events/:id/register
// @desc    Register for an event
// @access  Attendee only
router.post('/:id/register', auth, authorizeRoles('attendee'), EventController.registerForEvent);

module.exports = router;
