const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get company info (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM company_info LIMIT 1');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Company info not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update company info (PROTECTED)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { company_name, vision, mission, address, phone, email } = req.body;
    
    await db.query(
      'UPDATE company_info SET company_name = ?, vision = ?, mission = ?, address = ?, phone = ?, email = ? WHERE id = ?',
      [company_name, vision, mission, address, phone, email, id]
    );
    
    res.json({ message: 'Company info updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;