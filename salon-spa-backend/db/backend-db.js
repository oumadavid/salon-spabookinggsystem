const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Wavinya123@',      // use your MySQL password
  database: 'salon_spa_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

module.exports = db;
