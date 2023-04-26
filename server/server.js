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
app.post('/api/user', (req, res) => {
  const { displayName, photoURL } = req.body;

  // Log user's display name and photo URL to console
  console.log(`User logged in: ${displayName}, photo URL: ${photoURL}`);

  // Send response to client
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
