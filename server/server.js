#!/usr/bin/env node

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

// PPOST request to handle user sign in and sign up with Firebase Auth
app.post('/api/user/signin', async (req, res) => {
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

// GET request for the header component to get the user's display name
app.get('/api/user/:uid/getInfo', async (req, res) => {
  const uid = req.params.uid;

  // send the user's display name
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT display_name FROM Users WHERE id = ?', [uid]);
    await connection.end();

    // set the content type header to JSON
    res.setHeader('Content-Type', 'application/json');

    // return the user's display name as valid JSON
    res.status(200).json(rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user info from database');
  }
});

// POST request toto change and update the user's display name
app.post('/api/user/:uid/updateInfo', async (req, res) => {
  const uid = req.params.uid;
  const { displayName } = req.body;

  try {
    const connection = await getConnection();

    await connection.execute('UPDATE Users SET display_name = ? WHERE id = ?', [displayName, uid]);
    await connection.end();

    res.status(200).send('User info updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user info in database');
  }
});

// POST request to create a new recipe
app.post('/api/recipe/create', async (req, res) => {
  // get the recipe data from the request body
  const recipe = req.body;

  // write the name, description, and image to the database
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'INSERT INTO Recipe (title, description, image_url) VALUES (?, ?, ?)',
      [recipe.recipeName, recipe.recipeDescription, recipe.recipeImage]
    );

    // get the id of the new recipe using select last insert id
    var newRecipeId = await connection.execute('SELECT LAST_INSERT_ID()');
    newRecipeId = newRecipeId[0][0]['LAST_INSERT_ID()'];

    await connection.end();

    // get the recipe id from the database
    const recipe_id = rows.insertId;

    // write the ingredients to the database
    for (const ingredient of recipe.items) {
      const connection = await getConnection();
      await connection.execute(
        'INSERT INTO Item (name, amount, recipe_id) VALUES (?, ?, ?)',
        [ingredient.name, ingredient.amount, recipe_id]
      );
      await connection.end();
    }

    // append a new line to the instructions
    recipe.recipeInstructions += '\n';

    // write the instructions to the database
    const newConnection = await getConnection();
    await newConnection.execute(
      'INSERT INTO Instructions (steps, recipe_id) VALUES (?, ?)',
      [recipe.recipeInstructions, recipe_id]
    );
    await newConnection.end();

    res.status(200).json({ message: 'Recipe created', recipeId: newRecipeId });
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error creating recipe');
  }
});

// DELETE request to delete a recipe from the database
app.delete('/api/recipe/:id/delete', async (req, res) => {
  const recipeId = req.params.id;

  try {
    const connection = await getConnection();

    await connection.execute('DELETE FROM Recipe WHERE id = ?', [recipeId]);

    await connection.end();

    res.status(200).send({ message: 'Recipe deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting recipe' });
  }
});

// GET request to get all recipes from database
app.get('/api/recipes/all', async (req, res) => {
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

// GET request to get recipe from database based on recipe id
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

// GET request to get recipes from database based on search term
app.get('/api/recipes/search/:search', async (req, res) => {
  const search = req.params.search;

  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM Recipe WHERE title LIKE ?', ['%' + search + '%']);
    await connection.end();

    // check the description for the search term as well
    const descriptionConnection = await getConnection();
    const [descriptionRows] = await descriptionConnection.execute('SELECT * FROM Recipe WHERE description LIKE ?', ['%' + search + '%']);
    await descriptionConnection.end();

    // append the description rows to the title rows if they are not already in the title rows
    for (const descriptionRow of descriptionRows) {
      let found = false;
      for (const row of rows) {
        if (descriptionRow.id === row.id) {
          found = true;
        }
      }
      if (!found) {
        rows.push(descriptionRow);
      }
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving recipes from database');
  }
});

// GET request to get recipes from database based on if the user has saved them
app.get('/api/recipe/user/:uid', async (req, res) => {
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
app.post('/api/recipe/:id/save/user/:uid', async (req, res) => {
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

// DELETE request to remove the recipe from the user's saved recipes
app.delete('/api/recipe/:id/unsave/user/:uid', async (req, res) => {
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

// GET request to check if recipe is saved to user
app.get('/api/recipe/:id/issaved/user/:uid', async (req, res) => {
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

// POST request to add recipe items to user list
app.post('/api/recipe/:id/shopping/add/user/:uid', async (req, res) => {
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

// GET request to get all items from user's list
app.get('/api/list/user/:uid', async (req, res) => {
  const uid = req.params.uid;

  // get the data for each item in the user's list
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM Shopping_List WHERE Users_id = ?',
      [uid]
    );
    await connection.end();

    const items = [];
    for (const row of rows) {
      const connection = await getConnection();
      const [itemRows] = await connection.execute(
        'SELECT * FROM Item WHERE id = ?',
        [row.Item_id]
      );
      await connection.end();

      const item = {
        shopping_list_id: row.id,
        id: itemRows[0].id,
        name: itemRows[0].name,
        amount: itemRows[0].amount,
        recipe_id: row.Recipe_id,
      };
      items.push(item);
    }

    res.status(200).json(items);
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user list from database');
  }
});

// DELETE request to clear user's list
app.delete('/api/list/clear/user/:uid', async (req, res) => {
  const uid = req.params.uid;

  // delete all items from the user's list
  try {
    const connection = await getConnection();
    await connection.execute(
      'DELETE FROM Shopping_List WHERE Users_id = ?',
      [uid]
    );
    await connection.end();

    res.status(200).json({ message: 'User list cleared' });
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error clearing user list');
  }
});

// DELETE request to remove a specific item from user's list
app.delete('/api/list/user/:uid/item/remove/:shopping_list_id', async (req, res) => {
  const uid = req.params.uid;
  const shopping_list_id = req.params.shopping_list_id;

  // delete item from user's list
  try {
    const connection = await getConnection();
    await connection.execute(
      'DELETE FROM Shopping_List WHERE id = ?',
      [shopping_list_id]
    );
    await connection.end();

    res.status(200).json({ message: 'Item removed from user list' });
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error removing item from user list');
  }
});

// Handle all other route requests with the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front_end', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3005;
//const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
