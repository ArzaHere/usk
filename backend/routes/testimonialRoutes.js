const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// ==================== PUBLIC ENDPOINTS ====================

// Get all testimonials (PUBLIC - anyone can view)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT t.*, 
             c.name as client_name, 
             u.username as user_username,
             u.email as user_email
      FROM testimonials t
      LEFT JOIN clients c ON t.client_id = c.id
      LEFT JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching all testimonials:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get testimonial by id (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT t.*, 
             c.name as client_name, 
             u.username as user_username,
             u.email as user_email
      FROM testimonials t
      LEFT JOIN clients c ON t.client_id = c.id
      LEFT JOIN users u ON t.user_id = u.id
      WHERE t.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching testimonial by id:', error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== USER ENDPOINTS (AUTHENTICATED) ====================

// Get my testimonials (USER - own testimonials only)
router.get('/my/list', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM testimonials WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching my testimonials:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create new testimonial (AUTHENTICATED - user or admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { client_id, name, position, company, content, rating, image_url } = req.body;
    
    console.log('Creating testimonial with data:', { 
      user_id: req.user.userId, 
      user_role: req.user.role,
      client_id, 
      name, 
      position, 
      company, 
      content, 
      rating, 
      image_url 
    });
    
    // Validate required fields
    if (!name || !content) {
      return res.status(400).json({ message: 'Name and content are required' });
    }
    
    // Add user_id to track ownership
    const [result] = await db.query(
      'INSERT INTO testimonials (user_id, client_id, name, position, company, content, rating, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        req.user.userId, 
        client_id || null, 
        name, 
        position || '', 
        company || '', 
        content, 
        rating || 5, 
        image_url || ''
      ]
    );
    
    console.log('Testimonial created successfully with id:', result.insertId);
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Testimonial created successfully' 
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update testimonial (USER can update own, ADMIN can update all)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { client_id, name, position, company, content, rating, image_url } = req.body;
    
    console.log('Update request from user:', {
      userId: req.user.userId,
      userRole: req.user.role,
      testimonialId: req.params.id
    });
    
    // Validate required fields
    if (!name || !content) {
      return res.status(400).json({ message: 'Name and content are required' });
    }
    
    // Check if testimonial exists
    const [existing] = await db.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    console.log('Existing testimonial owner:', existing[0].user_id);
    console.log('Current user role:', req.user.role);
    console.log('Is admin?', req.user.role === 'admin');
    console.log('Is owner?', existing[0].user_id === req.user.userId);
    
    // FIXED: Admin can edit all, user can only edit their own
    const isAdmin = req.user.role === 'admin';
    const isOwner = existing[0].user_id === req.user.userId;
    
    if (!isAdmin && !isOwner) {
      console.log('Access denied: User is not admin and not owner');
      return res.status(403).json({ message: 'You can only edit your own testimonials' });
    }
    
    await db.query(
      'UPDATE testimonials SET client_id = ?, name = ?, position = ?, company = ?, content = ?, rating = ?, image_url = ? WHERE id = ?',
      [
        client_id || null, 
        name, 
        position || '', 
        company || '', 
        content, 
        rating || 5, 
        image_url || '', 
        req.params.id
      ]
    );
    
    console.log('Testimonial updated successfully');
    res.json({ message: 'Testimonial updated successfully' });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete testimonial (USER can delete own, ADMIN can delete all)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    console.log('Delete request from user:', {
      userId: req.user.userId,
      userRole: req.user.role,
      testimonialId: req.params.id
    });
    
    // Check if testimonial exists
    const [existing] = await db.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    console.log('Existing testimonial owner:', existing[0].user_id);
    console.log('Current user role:', req.user.role);
    console.log('Is admin?', req.user.role === 'admin');
    console.log('Is owner?', existing[0].user_id === req.user.userId);
    
    // FIXED: Admin can delete all, user can only delete their own
    const isAdmin = req.user.role === 'admin';
    const isOwner = existing[0].user_id === req.user.userId;
    
    if (!isAdmin && !isOwner) {
      console.log('Access denied: User is not admin and not owner');
      return res.status(403).json({ message: 'You can only delete your own testimonials' });
    }
    
    await db.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    
    console.log('Testimonial deleted successfully');
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;