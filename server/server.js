const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path')
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();

app.use(bodyParser.json());

const serviceAccount = require('./firebase-credentials.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Serve static files from the React app in build folder
app.use(express.static(path.join(__dirname, '../front_end/build')));

// Handles route rquests for pages in react
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front_end', 'build', 'index.html'));
});

// Handles post request for user logins
app.post('/api/user', async (req, res) => {
  const { displayName, photoURL } = req.body;

  try {
    // create a connection to the database
    const connection = await mysql.createConnection({
      host: 'classmysql.engr.oregonstate.edu',
      user: 'cs340_conkling',
      password: 'Grant3206',
      database: 'cs340_conkling',
    });

    // execute the query to insert the displayName into the Users table
    await connection.execute('INSERT INTO Users (display_name) (photoURL) VALUES (?)', [displayName, photoURL]);

    // close the database connection
    await connection.end();

    // Log user's display name to console
    console.log(`User logged in: ${displayName}`);

    // Send response to client
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting user into database');
  }
});


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
