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

app.get('/api/user/:uid/recipes', async (req, res) => {
  const uid = req.params.uid;
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM Recipe_has_users WHERE Users_id = ?',
      [uid]
    );
    await connection.end();

    const recipeIds = rows.map((row) => row.Recipe_id);
    // get recipe data for each recipe id
    const recipes = [];
    for (const id of recipeIds) {
      const connection = await getConnection();
      const [recipeRows] = await connection.execute(
        'SELECT * FROM Recipe WHERE id = ?',
        [id]
      );
      await connection.end();

      const recipe = {
        id: recipeRows[0].id,
        title: recipeRows[0].title,
        description: recipeRows[0].description,
        image_url: recipeRows[0].image_url,
      };
      recipes.push(recipe);
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user recipes from database');
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

      res.status(200).json({ message: 'Recipe saved to user' });
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

      res.status(200).json({ message: 'Recipe removed from user' });
    }
    else {
      res.status(200).json({ message: 'Recipe removed from user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error removing recipe from user');
  }
});

app.get('/api/user/:uid/check/:id', async (req, res) => {
  const uid = req.params.uid;
  const recipe_id = req.params.id;

  // check if user has saved recipe in database table Recipe_has_users
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM Recipe_has_users WHERE Users_id = ? AND Recipe_id = ?',
      [uid, recipe_id]
    );
    await connection.end();

    if (rows.length !== 0) {
      res.status(200).json({ message: 'Recipe saved to user', value: true });
    }
    else {
      res.status(200).json({ message: 'Recipe not saved to user', value: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error checking if recipe is saved to user');
  }
});

app.get('/api/user/:uid/list', async (req, res) => {
  const uid = req.params.uid;

  // get all items from user's list
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM Item_has_users WHERE Users_id = ?',
      [uid]
    );
    await connection.end();

    const itemIds = rows.map((row) => row.Item_id);
    // get item data for each item id
    const items = [];
    for (const id of itemIds) {
      const connection = await getConnection();
      const [itemRows] = await connection.execute(
        'SELECT * FROM Item WHERE id = ?',
        [id]
      );
      await connection.end();

      const item = {
        id: itemRows[0].id,
        name: itemRows[0].name,
        quantity: itemRows[0].quantity,
        unit: itemRows[0].unit,
      };
      items.push(item);
    }

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user list from database');
  }
});

app.post('/api/user/:uid/shopping/add/:id', async (req, res) => {
  const uid = req.params.uid;
  const recipe_id = req.params.id;

  // get all the item ids for the recipe id from the recipe
  const items = [];
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM Item WHERE recipe_id = ?',
      [recipe_id]
    );
    await connection.end();

    for (const row of rows) {
      items.push(row.id);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving recipe items from database');
  }

  // write each item to the user's list with the recipe id and the user id
  try {
    for (const item of items) {
      const connection = await getConnection();
      // check if user has already added item to list with the recipe id
      const [rows] = await connection.execute(
        'SELECT * FROM Shopping_List WHERE Users_id = ? AND Item_id = ? AND Recipe_id = ?',
        [uid, item, recipe_id]
      );
      await connection.end();

      // if user has not added item to list, insert into database

      if (rows.length === 0) {
        const connection = await getConnection();
        await connection.execute(
          'INSERT INTO Shopping_List (Users_id, Item_id, Recipe_id) VALUES (?, ?, ?)',
          [uid, item, recipe_id]
        );
        await connection.end();
      }
    }
    res.status(200).json({ message: 'Items added to user list' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding items to user list');
  }
});


/*
// get all the item ids from the recipe
const items = [];
try {
  const connection = await getConnection();
  const [rows] = await connection.execute(
    'SELECT * FROM Item WHERE recipe_id = ?',
    [recipe_id]
  );
  await connection.end();

  for (const row of rows) {
    items.push(row.id);
  }
} catch (error) {
  console.error(error);
  res.status(500).send('Error retrieving recipe items from database');
}

// add each item to the user's list
try {
  for (const item of items) {
    const connection = await getConnection();
    // check if user has already added item to list
    const [rows] = await connection.execute(

      'SELECT * FROM Item_has_users WHERE Users_id = ? AND Item_id = ?',
      [uid, item]
    );
    }
} catch (error) {
  console.error(error);
  res.status(500).send('Error adding item to user list');
}
*/

// Handle all other route requests with the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front_end', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
