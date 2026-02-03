const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const [products] = await db.query('SELECT COUNT(*) as count FROM products');
    const [articles] = await db.query('SELECT COUNT(*) as count FROM articles');
    const [events] = await db.query('SELECT COUNT(*) as count FROM events');
    const [gallery] = await db.query('SELECT COUNT(*) as count FROM gallery');
    const [clients] = await db.query('SELECT COUNT(*) as count FROM clients');
    const [users] = await db.query('SELECT COUNT(*) as count FROM users');

    res.json({
      products: products[0].count,
      articles: articles[0].count,
      events: events[0].count,
      gallery: gallery[0].count,
      clients: clients[0].count,
      users: users[0].count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get recent activities
router.get('/recent-activities', async (req, res) => {
  try {
    const [recentArticles] = await db.query(
      'SELECT id, title, created_at, "article" as type FROM articles ORDER BY created_at DESC LIMIT 5'
    );
    const [recentEvents] = await db.query(
      'SELECT id, title, created_at, "event" as type FROM events ORDER BY created_at DESC LIMIT 5'
    );
    const [recentProducts] = await db.query(
      'SELECT id, name as title, created_at, "product" as type FROM products ORDER BY created_at DESC LIMIT 5'
    );

    const activities = [...recentArticles, ...recentEvents, ...recentProducts]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10);

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;