const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all testimonials (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT t.*, c.name as client_name, u.username as user_username
      FROM testimonials t
      LEFT JOIN clients c ON t.client_id = c.id
      LEFT JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get testimonial by id (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get my testimonials (USER - own testimonials only)
router.get('/my/list', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM testimonials WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new testimonial (AUTHENTICATED - user or admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { client_id, name, position, company, content, rating, image_url } = req.body;
    
    // Add user_id to track ownership
    const [result] = await db.query(
      'INSERT INTO testimonials (user_id, client_id, name, position, company, content, rating, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.userId, client_id, name, position, company, content, rating, image_url]
    );
    res.status(201).json({ id: result.insertId, message: 'Testimonial created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update testimonial (USER can update own, ADMIN can update all)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { client_id, name, position, company, content, rating, image_url } = req.body;
    
    // Check ownership
    const [existing] = await db.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    // Allow if admin OR owner
    if (req.user.role !== 'admin' && existing[0].user_id !== req.user.userId) {
      return res.status(403).json({ message: 'You can only edit your own testimonials' });
    }
    
    await db.query(
      'UPDATE testimonials SET client_id = ?, name = ?, position = ?, company = ?, content = ?, rating = ?, image_url = ? WHERE id = ?',
      [client_id, name, position, company, content, rating, image_url, req.params.id]
    );
    res.json({ message: 'Testimonial updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete testimonial (USER can delete own, ADMIN can delete all)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Check ownership
    const [existing] = await db.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    // Allow if admin OR owner
    if (req.user.role !== 'admin' && existing[0].user_id !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete your own testimonials' });
    }
    
    await db.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;