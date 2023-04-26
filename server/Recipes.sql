-- insert Spaghetti Bolognese recipe
INSERT INTO
    `Recipe` (`title`, `description`, `image_url`)
VALUES
    (
        'Spaghetti Bolognese',
        'Classic spaghetti bolognese with a rich tomato and beef sauce',
        'https://www.example.com/images/spaghetti_bolognese.jpg'
    );

INSERT INTO
    `Instructions` (`steps`)
VALUES
    (
        '1. Heat oil in a large pan over medium heat. Add onions, garlic, and celery and cook until softened.
2. Add ground beef and cook until browned, breaking up any large chunks.
3. Stir in tomato paste, canned tomatoes, and beef broth. Bring to a simmer and let cook for 20 minutes.
4. Meanwhile, cook spaghetti according to package directions. Drain.
5. Serve spaghetti with bolognese sauce on top. Enjoy!'
    );

INSERT INTO
    `Item` (`amount`, `name`, `Recipe_id`)
VALUES
    ('1 pound', 'Ground beef', 1),
    ('1/2 cup', 'Chopped onions', 1),
    ('1/4 cup', 'Chopped celery', 1),
    ('1 clove', 'Garlic, minced', 1),
    ('2 tbsp', 'Tomato paste', 1),
    ('1 can (14 oz)', 'Canned tomatoes', 1),
    ('1/2 cup', 'Beef broth', 1),
    ('1 package (16 oz)', 'Spaghetti', 1);

-- insert Chicken Alfredo recipe
INSERT INTO
    `Recipe` (`title`, `description`, `image_url`)
VALUES
    (
        'Chicken Alfredo',
        'Creamy fettuccine alfredo with grilled chicken',
        'https://www.example.com/images/chicken_alfredo.jpg'
    );

INSERT INTO
    `Instructions` (`steps`)
VALUES
    (
        '1. Cook fettuccine according to package directions. Drain.
2. Meanwhile, season chicken with salt and pepper. Grill or sauté until cooked through.
3. In a separate pan, melt butter and add garlic. Cook for 1-2 minutes.
4. Add heavy cream and bring to a simmer. Let cook for 5 minutes.
5. Stir in Parmesan cheese and black pepper.
6. Add cooked fettuccine and chicken to the sauce. Toss to combine. Enjoy!'
    );

INSERT INTO
    `Item` (`amount`, `name`, `Recipe_id`)
VALUES
    ('1 pound', 'Fettuccine', 2),
    ('1 pound', 'Chicken breast', 2),
    ('1/2 cup', 'Butter', 2),
    ('2 cloves', 'Garlic, minced', 2),
    ('2 cups', 'Heavy cream', 2),
    ('1 cup', 'Grated Parmesan cheese', 2),
    ('1/2 teaspoon', 'Black pepper', 2);

-- insert Caesar Salad recipe
INSERT INTO
    `Recipe` (`title`, `description`, `image_url`)
VALUES
    (
        'Caesar Salad',
        'Classic Caesar salad with homemade dressing and croutons',
        'https://www.example.com/images/caesar_salad.jpg'
    );

INSERT INTO
    `Instructions` (`steps`)
VALUES
    (
        '1. Preheat oven to 375°F.
2. Cut bread into cubes and toss with olive oil, salt, and pepper.
3. Bake for 10-12 minutes until golden brown and crisp.
4. Meanwhile, in a bowl whisk together garlic, mustard, anchovy paste, Worcestershire sauce, lemon juice, and egg yolk.
5. Slowly drizzle in olive oil while whisking constantly until dressing is emulsified.
6. Stir in Parmesan cheese and season with salt and pepper.
7. Toss lettuce with dressing and croutons. Enjoy!'
    );

INSERT INTO
    `Item` (`amount`, `name`, `Recipe_id`)
VALUES
    ('1 loaf', 'French bread', 3),
    ('1/4 cup', 'Olive oil', 3),
    ('1 clove', 'Garlic, minced', 3),
    ('1 teaspoon', 'Dijon mustard', 3),
    ('1 teaspoon', 'Anchovy paste', 3),
    ('1 teaspoon', 'Worcestershire sauce', 3),
    ('1/2 lemon', 'Juice of lemon', 3),
    ('1', 'Egg yolk', 3),
    ('1/2 cup', 'Olive oil', 3),
    ('1/2 cup', 'Grated Parmesan cheese', 3),
    ('1 head', 'Romaine lettuce, chopped', 3);