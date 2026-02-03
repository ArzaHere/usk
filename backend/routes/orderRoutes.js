const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Generate order number
function generateOrderNumber() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
}

// Get all orders (ADMIN)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by id (ADMIN or own order)
router.get('/:id', async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    const [items] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [req.params.id]);
    
    res.json({
      order: orders[0],
      items: items
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by order number (PUBLIC - for tracking)
router.get('/track/:orderNumber', async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE order_number = ?', [req.params.orderNumber]);
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    const [items] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [orders[0].id]);
    
    res.json({
      order: orders[0],
      items: items
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new order (PUBLIC)
router.post('/', async (req, res) => {
  try {
    const { customer_name, customer_email, customer_phone, customer_address, payment_method, items, notes } = req.body;
    
    // Calculate total
    let total_amount = 0;
    const itemsWithDetails = [];
    
    for (const item of items) {
      const [products] = await db.query('SELECT * FROM products WHERE id = ?', [item.product_id]);
      if (products.length === 0) {
        return res.status(404).json({ message: `Product with id ${item.product_id} not found` });
      }
      
      const product = products[0];
      const subtotal = product.price * item.quantity;
      total_amount += subtotal;
      
      itemsWithDetails.push({
        product_id: product.id,
        product_name: product.name,
        quantity: item.quantity,
        price: product.price,
        subtotal: subtotal
      });
    }
    
    const order_number = generateOrderNumber();
    
    // Insert order
    const [orderResult] = await db.query(
      'INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, customer_address, total_amount, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [order_number, customer_name, customer_email, customer_phone, customer_address, total_amount, payment_method, notes]
    );
    
    const order_id = orderResult.insertId;
    
    // Insert order items
    for (const item of itemsWithDetails) {
      await db.query(
        'INSERT INTO order_items (order_id, product_id, product_name, quantity, price, subtotal) VALUES (?, ?, ?, ?, ?, ?)',
        [order_id, item.product_id, item.product_name, item.quantity, item.price, item.subtotal]
      );
    }
    
    res.status(201).json({ 
      order_id: order_id,
      order_number: order_number,
      total_amount: total_amount,
      message: 'Order created successfully' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (ADMIN)
router.put('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { payment_status, shipping_status } = req.body;
    await db.query(
      'UPDATE orders SET payment_status = ?, shipping_status = ? WHERE id = ?',
      [payment_status, shipping_status, req.params.id]
    );
    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete order (ADMIN)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;