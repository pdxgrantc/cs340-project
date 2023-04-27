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

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving recipes from database');
  }
});

app.get('/api/recipe/:id', async (req, res) => {
  const recipeId = req.params.id;
  try {
    const connection = await getConnection();
    const [recipeRows] = await connection.execute(
      'SELECT * FROM Recipe WHERE id = ?',
      [recipeId]
    );

    const [itemRows] = await connection.execute(
      'SELECT * FROM Item WHERE recipe_id = ?',
      [recipeId]
    );
    const items = itemRows.map((item) => ({
      id: item.id,
      amount: item.amount,
      name: item.name,
    }));

    const [instructionRows] = await connection.execute(
      'SELECT * FROM Instructions WHERE recipe_id = ?',
      [recipeId]
    );
    const instructions = instructionRows[0].steps;

    await connection.end();

    const recipe = {
      id: recipeRows[0].id,
      title: recipeRows[0].title,
      description: recipeRows[0].description,
      image_url: recipeRows[0].image_url,
      items,
      instructions,
    };

    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving recipe from database');
  }
});

// Post request to save recipe to user in database
app.post('/api/user/:uid/save/:id', async (req, res) => {
  const uid = req.params.uid;
  const recipe_id = req.params.id;

  try {
    const connection = await getConnection();
    // check if user has already saved recipe in database table User_Has_Recipe
    const [rows] = await connection.execute(
      'SELECT * FROM Recipe_has_users WHERE Users_id = ? AND Recipe_id = ?',
      [uid, recipe_id]
    );

    // if user has not saved recipe, insert into database
    if (rows.length === 0) {
      await connection.execute(
        'INSERT INTO Recipe_has_users (Users_id, Recipe_id) VALUES (?, ?)',
        [uid, recipe_id]
      );
      await connection.end();

      res.status(200).send('Recipe saved to user');
    }
    else {
      res.status(200).send('Recipe already saved to user');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving recipe to user');
  }
});

app.delete('/api/user/:uid/unsave/:id', async (req, res) => {
  const uid = req.params.uid;
  const recipe_id = req.params.id;

  try {
    const connection = await getConnection();
    // check if user has saved recipe in database table Recipe_has_users
    const [rows] = await connection.execute(
      'SELECT * FROM Recipe_has_users WHERE Users_id = ? AND Recipe_id = ?',
      [uid, recipe_id]
    );

    // if user has saved recipe, delete from database
    if (rows.length !== 0) {
      await connection.execute(
        'DELETE FROM Recipe_has_users WHERE Users_id = ? AND Recipe_id = ?',
        [uid, recipe_id]
      );
      await connection.end();

      res.status(200).send('Recipe removed from user');
    }
    else {
      res.status(200).send('Recipe not saved to user');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error removing recipe from user');
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
