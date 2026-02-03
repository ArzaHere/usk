const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all events (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events ORDER BY event_date DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get event by id (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new event (PROTECTED)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, event_date, location, image_url, max_participants, registration_deadline } = req.body;
    const [result] = await db.query(
      'INSERT INTO events (title, description, event_date, location, image_url, max_participants, registration_deadline) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, event_date, location, image_url, max_participants, registration_deadline]
    );
    res.status(201).json({ id: result.insertId, message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update event (PROTECTED)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, event_date, location, image_url, max_participants, registration_deadline } = req.body;
    await db.query(
      'UPDATE events SET title = ?, description = ?, event_date = ?, location = ?, image_url = ?, max_participants = ?, registration_deadline = ? WHERE id = ?',
      [title, description, event_date, location, image_url, max_participants, registration_deadline, req.params.id]
    );
    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete event (PROTECTED)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;