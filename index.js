const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(express.static('public'));

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'bs4vloudm3utlpfqavll-mysql.services.clever-cloud.com',
  user: 'urqcisxvchkh30os',
  password: 'h097SJOJx7sex5tqZkqP',
  database: 'bs4vloudm3utlpfqavll',
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { fname, age, email, password, gender, confirm_password } = req.body;

  if (password !== confirm_password) {
    res.send('Error: Passwords do not match');
    return;
  }

  // Hash the password
  bcrypt.hash(password, 10, (hashError, hashedPassword) => {
    if (hashError) {
      console.error('Error hashing password:', hashError);
      res.send('Error submitting data.');
      return;
    }

    // Insert data into MySQL using parameterized query
    const insertQuery = 'INSERT INTO register_tb (fname, age, email, gender, password_hash) VALUES (?, ?, ?, ?, ?)';
    connection.query(insertQuery, [fname, age, email, gender, hashedPassword], (queryError, results, fields) => {
      if (queryError) {
        console.error('Error inserting data into MySQL:', queryError);
        res.send('Error submitting data.');
      } else {
        console.log('Data inserted into MySQL:', results);
        res.send('Data submitted successfully!');
      }
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
