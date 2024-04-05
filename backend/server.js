const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3306;

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tbookene_tbooke'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.json());

// Register endpoint
app.post('/register', (req, res) => {
  const { name, email, userType, password } = req.body;
  
  // Insert user into database
  const sql = `INSERT INTO users (name, email, userType, password) VALUES (?, ?, ?, ?)`;
  connection.query(sql, [name, email, userType, password], (err, result) => {
    if (err) {
      console.error('Error registering user: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('User registered successfully');
    res.status(200).json({ message: 'Registration successful' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
