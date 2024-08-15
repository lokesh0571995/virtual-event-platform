const { validationResult } = require('express-validator');
const Event = require('../models/Event');
const User  = require('../models/User');

class EventController {
  // GET /api/events
  static async getAllEvents(req, res) {
    try {
      const events = await Event.find().populate('organizer', 'name email').populate('participants', 'name email');
      res.json(events);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

  // POST /api/events
  static async createEvent(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, date,time } = req.body;

      const event = new Event({
        organizer: req.user.id,
        title,
        description,
        date,
        time,
      });

      await event.save();
      res.status(200).json({ message: 'Event created successfully', event });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

  // PUT /api/events/:id
  static async updateEvent(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, date,time } = req.body;

      let event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (event.organizer.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      event = await Event.findByIdAndUpdate(
        req.params.id,
        { $set: { title, description, date,time } },
        { new: true }
      );

      res.json({ message: 'Event updated successfully', event });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

  // DELETE /api/events/:id
  static async deleteEvent(req, res) {
    try {
      let event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (event.organizer.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      await Event.findByIdAndDelete(req.params.id);

      res.json({ message: 'Event deleted successfully!' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

  // POST /api/events/:id/register
  static async registerForEvent(req, res) {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (event.participants.includes(req.user.id)) {
        return res.status(400).json({ message: 'Already registered for the event' });
      }

      event.participants.push(req.user.id);
      await event.save();

      res.json({ message: 'Registered for the event successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
}

module.exports = EventController;
