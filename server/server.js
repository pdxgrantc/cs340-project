const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const admin = require('firebase-admin');

const app = express();

app.use(express.json());

// Serve static files from the React app in build folder
app.use(express.static(path.join(__dirname, '../front_end/build')));

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-credentials.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Acquire a database connection from the pool
const getConnection = async () => {
  return await mysql.createConnection({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_conkling',
    password: 'Grant3206',
    database: 'cs340_conkling',
  });
};

// POST request to insert a new user into the database
app.post('/api/signin', async (req, res) => {
  const { uid, displayName, photoURL, email } = req.body;

  // check if user exists in database by querying with uid
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM Users WHERE id = ?', [uid]);
    await connection.end();

    // if user does not exist, insert into database
    if (rows.length === 0) {
      const connection = await getConnection();
      await connection.execute('INSERT INTO Users (id, display_name, photoURL, email) VALUES (?, ?, ?, ?)', [uid, displayName, photoURL, email]);
      await connection.end();

      res.status(200).send('User added to database');
    }
    else {
      res.status(200).send('User already exists in database');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting user into database');
  }
});

app.get('/api/recipes', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM Recipe');
    await connection.end();

    console.log(rows);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving recipes from database');
  }
});

// Handle all other route requests with the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front_end', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
