const bcrypt = require('bcrypt');
const db = require('../db/backend-db'); // Adjust path accordingly

// Register a new user
exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Registration failed' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// Login a user
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // If frontend is handling redirection
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        redirectUrl: '/dashboard' // For frontend use
      });

      // If you're using server-side rendering (like EJS), use:
      // res.redirect('/dashboard');
    });
  });
};
