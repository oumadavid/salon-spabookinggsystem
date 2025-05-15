const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const authRoutes = require('../salon-spa-backend/routes/auth');// ⬅️ import your routes

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public'));  // For root files
app.use('/pages', express.static('pages'));  // For pages directory

// DB connection

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Wavinya123@',
  database: 'salon_spa_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log("Connected to MySQL!");
});

// API routes
app.use('/api', authRoutes); // ⬅️ mount at /api

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
