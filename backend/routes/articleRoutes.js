const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all articles (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM articles ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get article by id (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new article (PROTECTED)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, content, image_url, author, external_url } = req.body;
    const [result] = await db.query(
      'INSERT INTO articles (title, content, image_url, author, external_url) VALUES (?, ?, ?, ?, ?)',
      [title, content, image_url, author, external_url]
    );
    res.status(201).json({ id: result.insertId, message: 'Article created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update article (PROTECTED)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, content, image_url, author, external_url } = req.body;
    await db.query(
      'UPDATE articles SET title = ?, content = ?, image_url = ?, author = ?, external_url = ? WHERE id = ?',
      [title, content, image_url, author, external_url, req.params.id]
    );
    res.json({ message: 'Article updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete article (PROTECTED)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.query('DELETE FROM articles WHERE id = ?', [req.params.id]);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;