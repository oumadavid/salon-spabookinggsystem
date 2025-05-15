 const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql =re('mysql');
const bookingRoutes = require('../routes/bookings');

// Middleware
app.use(express.json());
app.use(cors());
const app = express();
const port = 3000; // You can change this if needed

app.use('/bookings', bookingRoutes);
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // use your MySQL username
  password: 'Wavinya123@',      // your MySQL password
  database: 'salon_spa_db' // make sure this DB exists
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running 🎉');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
