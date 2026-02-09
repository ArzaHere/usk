const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user (default role is 'user')
    const [result] = await db.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, 'user']
    );
    
    console.log('User registered:', username, email);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt for:', email);
    
    // Find user
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = users[0];
    console.log('User found:', user.email, 'Role:', user.role);
    
    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // CRITICAL: Include role in JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        role: user.role  // ⬅️ PENTING: Role harus ada di token!
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    console.log('Login successful - Token generated for user:', user.email, 'Role:', user.role);
    
    // Return token and user info
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role  // ⬅️ PENTING: Role harus dikirim ke frontend!
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Verify token (optional endpoint untuk debug)
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log('Token verified:', decoded);
    
    res.json({
      valid: true,
      user: decoded
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ 
      valid: false,
      message: 'Invalid token' 
    });
  }
});

module.exports = router;