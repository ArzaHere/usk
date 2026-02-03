const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all gallery items (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM gallery';
    let params = [];
    
    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get gallery item by id (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new gallery item (PROTECTED)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, image_url, description, category } = req.body;
    const [result] = await db.query(
      'INSERT INTO gallery (title, image_url, description, category) VALUES (?, ?, ?, ?)',
      [title, image_url, description, category]
    );
    res.status(201).json({ id: result.insertId, message: 'Gallery item created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update gallery item (PROTECTED) - NEW FEATURE!
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, image_url, description, category } = req.body;
    await db.query(
      'UPDATE gallery SET title = ?, image_url = ?, description = ?, category = ? WHERE id = ?',
      [title, image_url, description, category, req.params.id]
    );
    res.json({ message: 'Gallery item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete gallery item (PROTECTED)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;