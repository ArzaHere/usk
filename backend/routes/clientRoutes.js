const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all clients (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get client by id (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new client (PROTECTED)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, logo_url, description } = req.body;
    const [result] = await db.query(
      'INSERT INTO clients (name, logo_url, description) VALUES (?, ?, ?)',
      [name, logo_url, description]
    );
    res.status(201).json({ id: result.insertId, message: 'Client created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update client (PROTECTED)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, logo_url, description } = req.body;
    await db.query(
      'UPDATE clients SET name = ?, logo_url = ?, description = ? WHERE id = ?',
      [name, logo_url, description, req.params.id]
    );
    res.json({ message: 'Client updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete client (PROTECTED)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.query('DELETE FROM clients WHERE id = ?', [req.params.id]);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;