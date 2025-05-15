const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/backend-db'); // Adjust path if needed

// Register
router.post('/register', (req, res) => {
  const { username, email, phone, password } = req.body;

  
  
  // Validate all required fields
  if (!username || !email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Password hashing error' });

    const query = 'INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, phone, hashedPassword], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          error: 'Registration failed',
          details: err.message // Include error details for debugging
        });
      }
      res.status(201).json({ 
        message: 'User registered successfully',
        user: {
          id: result.insertId,
          username: newUser.username,
          email: newUser.email
        },
        redirect: '/dashboard.html'
       });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        redirect: '/dashboard.html'
      });
    });
  });
});

module.exports = router;
