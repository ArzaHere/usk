const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all registrations for an event (ADMIN)
router.get('/event/:eventId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM event_registrations WHERE event_id = ? ORDER BY created_at DESC',
      [req.params.eventId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all registrations (ADMIN)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT er.*, e.title as event_title 
      FROM event_registrations er
      JOIN events e ON er.event_id = e.id
      ORDER BY er.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new registration (PUBLIC)
router.post('/', async (req, res) => {
  try {
    const { event_id, name, email, phone, company, message } = req.body;
    
    // Check if event exists and not full
    const [events] = await db.query('SELECT * FROM events WHERE id = ?', [event_id]);
    if (events.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const event = events[0];
    
    // Check registration count
    const [registrations] = await db.query(
      'SELECT COUNT(*) as count FROM event_registrations WHERE event_id = ? AND status != "cancelled"',
      [event_id]
    );
    
    if (registrations[0].count >= event.max_participants) {
      return res.status(400).json({ message: 'Event is full' });
    }
    
    // Check deadline
    if (event.registration_deadline && new Date(event.registration_deadline) < new Date()) {
      return res.status(400).json({ message: 'Registration deadline has passed' });
    }
    
    const [result] = await db.query(
      'INSERT INTO event_registrations (event_id, name, email, phone, company, message) VALUES (?, ?, ?, ?, ?, ?)',
      [event_id, name, email, phone, company, message]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Registration successful! We will contact you soon.' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update registration status (ADMIN)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    await db.query(
      'UPDATE event_registrations SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    res.json({ message: 'Registration status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete registration (ADMIN)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.query('DELETE FROM event_registrations WHERE id = ?', [req.params.id]);
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;