-- insert Spaghetti Bolognese recipe
INSERT INTO
    `Recipe` (`title`, `description`, `image_url`)
VALUES
    (
        'Spaghetti Bolognese',
        'Classic spaghetti bolognese with a rich tomato and beef sauce',
        'https://bakeitwithlove.com/wp-content/uploads/2022/01/Spaghetti-Bolognese-h.jpg'
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
        'https://hips.hearstapps.com/hmg-prod/images/delish-221130-perfect-chicken-alfredo-0683-eb-1670449995.jpg?crop=1xw:0.8277591973244147xh;center,top'
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
        'https://www.foodandwine.com/thmb/df0xQFraDimtpDf1kQoUJzTAIl4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Classic-Caesar-Salad-FT-RECIPE0223-a2dc1f3632224a70a7d71c67d1f64876.jpg'
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

-- insert Margherita Pizza recipe
INSERT INTO
    `Recipe` (`title`, `description`, `image_url`)
VALUES
    (
        'Margherita Pizza',
        'Traditional pizza with tomato sauce, mozzarella, and fresh basil',
        'https://www.foodandwine.com/thmb/3kzG4PWOAgZIIfZwMBLKqoTkaGQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/margherita-pizza-with-argula-and-prosciutto-FT-RECIPE0721-04368ec288a84d2e997573aca0001d98.jpg'
    );

INSERT INTO
    `Instructions` (`steps`)
VALUES
    (
        '1. Preheat oven to 475°F.
2. Roll out pizza dough on a floured surface and transfer to a pizza pan.
3. Spread tomato sauce over the dough, leaving a 1/2 inch border around the edge.
4. Sprinkle shredded mozzarella over the sauce.
5. Top with fresh basil leaves.
6. Bake for 12-15 minutes until crust is golden brown and cheese is melted.
7. Slice and serve hot. Enjoy!'
    );

INSERT INTO
    `Item` (`amount`, `name`, `Recipe_id`)
VALUES
    ('1 pound', 'Pizza dough', 4),
    ('1 cup', 'Tomato sauce', 4),
    ('2 cups', 'Shredded mozzarella cheese', 4),
    ('1/2 cup', 'Fresh basil leaves', 4);

-- insert Chocolate Chip Cookie recipe
INSERT INTO
    `Recipe` (`title`, `description`, `image_url`)
VALUES
    (
        'Chocolate Chip Cookies',
        'Classic chocolate chip cookies with a soft and chewy texture',
        'https://www.modernhoney.com/wp-content/uploads/2019/06/Best-Chocolate-Chip-Cookie-Recipe-1.jpg'
    );

INSERT INTO
    `Instructions` (`steps`)
VALUES
    (
        '1. Preheat oven to 375°F.
2. In a large bowl, cream together butter, white sugar, and brown sugar until smooth.
3. Beat in eggs one at a time, then stir in vanilla.
4. In a separate bowl, whisk together flour, baking soda, and salt.
5. Gradually add flour mixture to butter mixture and mix until just combined.
6. Stir in chocolate chips.
7. Drop dough by rounded tablespoonfuls onto ungreased baking sheets.
8. Bake for 8 to 10 minutes, or until lightly golden brown. Enjoy!'
    );

INSERT INTO
    `Item` (`amount`, `name`, `recipe_id`)
VALUES
    ('1 cup', 'Butter, softened', 5),
    ('1/2 cup', 'White sugar', 5),
    ('1 cup', 'Brown sugar, packed', 5),
    ('2', 'Eggs', 5),
    ('2 tsp', 'Vanilla extract', 5),
    ('3 cups', 'All-purpose flour', 5),
    ('1 tsp', 'Baking soda', 5),
    ('1/2 tsp', 'Salt', 5),
    ('2 cups', 'Semisweet chocolate chips', 5);

-- insert Butter Noodles recipe
INSERT INTO
    `Recipe` (`title`, `description`, `image_url`)
VALUES
    (
        'Butter Noodles',
        'Simple pasta dish with butter, garlic, and Parmesan cheese',
        'https://www.foodandwine.com/thmb/3kzG4PWOAgZIIfZwMBLKqoTkaGQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/margherita-pizza-with-argula-and-prosciutto-FT-RECIPE0721-04368ec288a84d2e997573aca0001d98.jpg'
    );

INSERT INTO
    `Instructions` (`steps`)
VALUES
    (
        '1. Bring a large pot of salted water to a boil.
2. Cook pasta according to package directions until al dente.
3. Drain pasta and return to pot.
4. Add butter and garlic to pasta and toss until butter is melted.
5. Stir in Parmesan cheese and season with salt and pepper.
6. Serve hot. Enjoy!'
    );

INSERT INTO
    `Item` (`amount`, `name`, `recipe_id`)
VALUES
    ('1 pound', 'Pasta', 6),
    ('1/2 cup', 'Butter', 6),
    ('2 cloves', 'Garlic, minced', 6),
    ('1/2 cup', 'Grated Parmesan cheese', 6);

-- insert Chicken Noodle Soup recipe
INSERT INTO
    `Recipe` (`title`, `description`, `image_url`)
VALUES
    (
        'Chicken Noodle Soup',
        'Classic chicken noodle soup with carrots, celery, and egg noodles',
        'https://www.foodandwine.com/thmb/3kzG4PWOAgZIIfZwMBLKqoTkaGQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/margherita-pizza-with-argula-and-prosciutto-FT-RECIPE0721-04368ec288a84d2e997573aca0001d98.jpg'
    );

INSERT INTO
    `Instructions` (`steps`)
VALUES
    (
        '1. In a large pot over medium heat, combine chicken, chicken broth, water, carrots, celery, onion, bay leaf, thyme, salt, and pepper.
2. Bring to a boil, then reduce heat and simmer until chicken is cooked through, about 15 minutes.
3. Remove chicken from pot and shred with two forks.
4. Return chicken to pot and add egg noodles.
5. Cook until noodles are tender, about 10 minutes.
6. Remove bay leaf and serve hot. Enjoy!'
    );

INSERT INTO
    `Item` (`amount`, `name`, `recipe_id`)
VALUES
    ('1 pound', 'Chicken breasts', 7),
    ('8 cups', 'Chicken broth', 7),
    ('4 cups', 'Water', 7),
    ('2', 'Carrots, peeled and sliced', 7),
    ('2 stalks', 'Celery, sliced', 7),
    ('1', 'Onion, diced', 7),
    ('1', 'Bay leaf', 7),
    ('1/2 tsp', 'Dried thyme', 7),
    ('1 tsp', 'Salt', 7),
    ('1/2 tsp', 'Pepper', 7),
    ('2 cups', 'Egg noodles', 7);

-- insert Butter Chicken Curry recipe
INSERT INTO
    `Recipe` (`title`, `description`, `image_url`)
VALUES
    (
        'Butter Chicken Curry',
        'Indian chicken curry with a creamy tomato sauce',
        'https://www.foodandwine.com/thmb/3kzG4PWOAgZIIfZwMBLKqoTkaGQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/margherita-pizza-with-argula-and-prosciutto-FT-RECIPE0721-04368ec288a84d2e997573aca0001d98.jpg'
    );

INSERT INTO
    `Instructions` (`steps`)
VALUES
    (
        '1. In a large skillet over medium heat, heat oil.
2. Add onion and cook until soft, about 5 minutes.
3. Add garlic, ginger, garam masala, cumin, and turmeric and cook until fragrant, about 1 minute.
4. Add tomato paste and cook until darkened in color, about 2 minutes.
5. Add chicken and season with salt and pepper.
6. Cook until chicken is no longer pink, about 10 minutes.
7. Stir in heavy cream and simmer until sauce has thickened, about 5 minutes.
8. Serve hot with rice and naan. Enjoy!'
    );

INSERT INTO
    `Item` (`amount`, `name`, `recipe_id`)
VALUES
    ('1 tbsp', 'Vegetable oil', 8),
    ('1', 'Onion, diced', 8),
    ('2 cloves', 'Garlic, minced', 8),
    ('1 tbsp', 'Fresh ginger, minced', 8),
    ('1 tbsp', 'Garam masala', 8),
    ('1 tsp', 'Ground cumin', 8),
    ('1 tsp', 'Ground turmeric', 8),
    ('1 tbsp', 'Tomato paste', 8),
    (
        '1 pound',
        'Chicken breasts, cut into 1" pieces',
        8
    ),
    ('1 cup', 'Heavy cream', 8);

-- insert Chicken Parmesan recipe
INSERT INTO
    `Recipe` (`title`, `description`, `image_url`)
VALUES
    (
        'Chicken Parmesan',
        'Breaded chicken breasts topped with tomato sauce and mozzarella cheese',
        'https://www.foodandwine.com/thmb/3kzG4PWOAgZIIfZwMBLKqoTkaGQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/margherita-pizza-with-argula-and-prosciutto-FT-RECIPE0721-04368ec288a84d2e997573aca0001d98.jpg'
    );

INSERT INTO
    `Instructions` (`steps`)
VALUES
    (
        '1. Preheat oven to 400 degrees F.
2. In a shallow bowl, combine breadcrumbs and Parmesan cheese.
3. In another shallow bowl, whisk together eggs and milk.
4. Season chicken with salt and pepper, then dredge in flour.
5. Dip chicken in egg mixture, then dredge in breadcrumb mixture.
6. In a large skillet over medium heat, heat oil.
7. Add chicken and cook until golden, about 6 minutes per side.
8. Transfer chicken to a baking dish and top with tomato sauce and mozzarella.
9. Bake until cheese is melted and chicken is cooked through, about 10 minutes.
10. Serve hot with pasta. Enjoy!'
    );

INSERT INTO
    `Item` (`amount`, `name`, `recipe_id`)
VALUES
    ('1 cup', 'Breadcrumbs', 9),
    ('1/2 cup', 'Grated Parmesan cheese', 9),
    ('2', 'Eggs', 9),
    ('1/4 cup', 'Milk', 9),
    ('4', 'Chicken breasts', 9),
    ('1/2 cup', 'Flour', 9),
    ('1/4 cup', 'Vegetable oil', 9),
    ('2 cups', 'Tomato sauce', 9),
    ('1 cup', 'Shredded mozzarella cheese', 9);

-- insert Chimichangas recipe
INSERT INTO
    `Recipe` (`title`, `description`, `image_url`)
VALUES
    (
        'Chimichangas',
        'Fried burritos filled with ground beef, beans, and cheese',
        'https://www.foodandwine.com/thmb/3kzG4PWOAgZIIfZwMBLKqoTkaGQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/margherita-pizza-with-argula-and-prosciutto-FT-RECIPE0721-04368ec288a84d2e997573aca0001d98.jpg'
    );

INSERT INTO
    `Instructions` (`steps`)
VALUES
    (
        '1. In a large skillet over medium heat, heat oil.
2. Add onion and cook until soft, about 5 minutes.
3. Add ground beef and cook until no longer pink, about 6 minutes.
4. Drain fat.
5. Add taco seasoning and water and stir until combined.
6. Add refried beans and stir until combined.
7. Season with salt and pepper.
8. Lay tortillas on a flat surface and divide beef mixture between them.
9. Top with cheese, then fold in sides and roll up burrito-style.
10. In a large skillet over medium heat, heat oil.
11. Add chimichangas and cook until golden, about 1 minute per side.
12. Transfer to a paper towel-lined plate to drain.
13. Serve hot with sour cream and salsa. Enjoy!'
    );

INSERT INTO
    `Item` (`amount`, `name`, `recipe_id`)
VALUES
    ('1 tbsp', 'Vegetable oil', 10),
    ('1', 'Onion, diced', 10),
    ('1 pound', 'Ground beef', 10),
    ('1 packet', 'Taco seasoning', 10),
    ('1/4 cup', 'Water', 10),
    ('1 can', 'Refried beans', 10),
    ('Salt', 'to taste', 10),
    ('Pepper', 'to taste', 10),
    ('4', 'Flour tortillas', 10),
    ('1 cup', 'Shredded cheddar cheese', 10),
    ('1/4 cup', 'Vegetable oil', 10),
    ('Sour cream', 'for serving', 10),
    ('Salsa', 'for serving', 10);