-- File: SampleData.sql
-- CS 340
-- Purpose: Inserts sample recipe data into the database

-- insert Spaghetti Bolognese recipe
INSERT INTO
    Recipe (title, description, image_url)
VALUES
    (
        'Spaghetti Bolognese',
        "Spaghetti Bolognese is a classic Italian dish consisting of spaghetti noodles served with a rich and savory meat sauce made with ground beef, tomatoes, onions, garlic, and a blend of herbs and spices. The sauce is simmered for hours to develop a deep and complex flavor, and it's typically served with a sprinkling of grated Parmesan cheese and a side of garlic bread. This hearty and comforting dish is a staple in Italian cuisine and is beloved by many for its simplicity, deliciousness, and heartiness.",
        'https://bakeitwithlove.com/wp-content/uploads/2022/01/Spaghetti-Bolognese-h.jpg'
    );

INSERT INTO
    Instructions (steps, recipe_id)
VALUES
    (
        '1. Heat oil in a large pan over medium heat. Add onions, garlic, and celery and cook until softened.
2. Add ground beef and cook until browned, breaking up any large chunks.
3. Stir in tomato paste, canned tomatoes, and beef broth. Bring to a simmer and let cook for 20 minutes.
4. Meanwhile, cook spaghetti according to package directions. Drain.
5. Serve spaghetti with bolognese sauce on top. Enjoy!',
        LAST_INSERT_ID()
    );

INSERT INTO
    Item (amount, name, recipe_id)
VALUES
    ('1 pound', 'Ground beef', LAST_INSERT_ID()),
    ('1/2 cup', 'Chopped onions', LAST_INSERT_ID()),
    ('1/4 cup', 'Chopped celery', LAST_INSERT_ID()),
    ('1 clove', 'Garlic, minced', LAST_INSERT_ID()),
    ('2 tbsp', 'Tomato paste', LAST_INSERT_ID()),
    (
        '1 can (14 oz)',
        'Canned tomatoes',
        LAST_INSERT_ID()
    ),
    ('1/2 cup', 'Beef broth', LAST_INSERT_ID()),
    (
        '1 package (16 oz)',
        'Spaghetti',
        LAST_INSERT_ID()
    );

-- insert Chicken Alfredo recipe
INSERT INTO
    Recipe (title, description, image_url)
VALUES
    (
        'Chicken Alfredo',
        "Chicken Alfredo is a classic Italian-American pasta dish that consists of fettuccine pasta, chicken, and a rich and creamy Alfredo sauce. The sauce is made from butter, heavy cream, garlic, and Parmesan cheese. The chicken is cooked separately and then combined with the sauce and pasta, creating a comforting and satisfying meal. It's a popular dish in restaurants and can also be easily made at home. Chicken Alfredo is a great comfort food option for those who love creamy and cheesy pasta dishes.",
        'https://hips.hearstapps.com/hmg-prod/images/delish-221130-perfect-chicken-alfredo-0683-eb-1670449995.jpg?crop=1xw:0.8277591973244147xh;center,top'
    );

INSERT INTO
    Instructions (steps, recipe_id)
VALUES
    (
        '1. Cook fettuccine according to package directions. Drain.
2. Meanwhile, season chicken with salt and pepper. Grill or sauté until cooked through.
3. In a separate pan, melt butter and add garlic. Cook for 1-2 minutes.
4. Add heavy cream and bring to a simmer. Let cook for 5 minutes.
5. Stir in Parmesan cheese and black pepper.
6. Add cooked fettuccine and chicken to the sauce. Toss to combine. Enjoy!',
        LAST_INSERT_ID()
    );

INSERT INTO
    Item (amount, name, Recipe_id)
VALUES
    ('1 pound', 'Fettuccine', LAST_INSERT_ID()),
    ('1 pound', 'Chicken breast', LAST_INSERT_ID()),
    ('1/2 cup', 'Butter', LAST_INSERT_ID()),
    ('2 cloves', 'Garlic, minced', LAST_INSERT_ID()),
    ('2 cups', 'Heavy cream', LAST_INSERT_ID()),
    (
        '1 cup',
        'Grated Parmesan cheese',
        LAST_INSERT_ID()
    ),
    ('1/2 teaspoon', 'Black pepper', LAST_INSERT_ID());

-- insert Caesar Salad recipe
INSERT INTO
    Recipe (title, description, image_url)
VALUES
    (
        'Caesar Salad',
        "Caesar salad is a classic dish made with crisp romaine lettuce, croutons, Parmesan cheese, and a creamy dressing. The dressing typically includes ingredients such as garlic, anchovy paste, lemon juice, Dijon mustard, and Worcestershire sauce, which are whisked together with egg yolks and olive oil. The salad is often served as a starter or side dish, but can also be made into a more substantial meal by adding grilled chicken or shrimp. With its tangy, garlicky flavor and satisfying crunch, Caesar salad is a beloved favorite for many salad lovers.",
        'https://www.foodandwine.com/thmb/df0xQFraDimtpDf1kQoUJzTAIl4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Classic-Caesar-Salad-FT-RECIPE0223-a2dc1f3632224a70a7d71c67d1f64876.jpg'
    );

INSERT INTO
    Instructions (steps, recipe_id)
VALUES
    (
        '1. Preheat oven to 375°F.
2. Cut bread into cubes and toss with olive oil, salt, and pepper.
3. Bake for 10-12 minutes until golden brown and crisp.
4. Meanwhile, in a bowl whisk together garlic, mustard, anchovy paste, Worcestershire sauce, lemon juice, and egg yolk.
5. Slowly drizzle in olive oil while whisking constantly until dressing is emulsified.
6. Stir in Parmesan cheese and season with salt and pepper.
7. Toss lettuce with dressing and croutons. Enjoy!',
        LAST_INSERT_ID()
    );

INSERT INTO
    Item (amount, name, Recipe_id)
VALUES
    ('1 loaf', 'French bread', LAST_INSERT_ID()),
    ('1/4 cup', 'Olive oil', LAST_INSERT_ID()),
    ('1 clove', 'Garlic, minced', LAST_INSERT_ID()),
    ('1 teaspoon', 'Dijon mustard', LAST_INSERT_ID()),
    ('1 teaspoon', 'Anchovy paste', LAST_INSERT_ID()),
    (
        '1 teaspoon',
        'Worcestershire sauce',
        LAST_INSERT_ID()
    ),
    ('1/2 lemon', 'Juice of lemon', LAST_INSERT_ID()),
    ('1', 'Egg yolk', LAST_INSERT_ID()),
    ('1/2 cup', 'Olive oil', LAST_INSERT_ID()),
    (
        '1/2 cup',
        'Grated Parmesan cheese',
        LAST_INSERT_ID()
    ),
    (
        '1 head',
        'Romaine lettuce, chopped',
        LAST_INSERT_ID()
    );

-- insert Margherita Pizza recipe
INSERT INTO
    Recipe (title, description, image_url)
VALUES
    (
        'Margherita Pizza',
        'Margarita pizza is a classic Neapolitan-style pizza that consists of a thin and crispy crust topped with a simple but delicious combination of tomato sauce, mozzarella cheese, and fresh basil. The tomato sauce is typically made with San Marzano tomatoes, which are known for their sweet and tangy flavor. The mozzarella cheese used is usually fresh and moist, and melts perfectly on top of the pizza. The fresh basil adds a fragrant aroma and a subtle hint of sweetness to the pizza.',
        'https://www.foodandwine.com/thmb/3kzG4PWOAgZIIfZwMBLKqoTkaGQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/margherita-pizza-with-argula-and-prosciutto-FT-RECIPE0721-04368ec288a84d2e997573aca0001d98.jpg'
    );

INSERT INTO
    Instructions (steps, recipe_id)
VALUES
    (
        '1. Preheat oven to 475°F.
2. Roll out pizza dough on a floured surface and transfer to a pizza pan.
3. Spread tomato sauce over the dough, leaving a 1/2 inch border around the edge.
4. Sprinkle shredded mozzarella over the sauce.
5. Top with fresh basil leaves.
6. Bake for 12-15 minutes until crust is golden brown and cheese is melted.
7. Slice and serve hot. Enjoy!',
        LAST_INSERT_ID()
    );

INSERT INTO
    Item (amount, name, Recipe_id)
VALUES
    ('1 pound', 'Pizza dough', LAST_INSERT_ID()),
    ('1 cup', 'Tomato sauce', LAST_INSERT_ID()),
    (
        '2 cups',
        'Shredded mozzarella cheese',
        LAST_INSERT_ID()
    ),
    (
        '1/2 cup',
        'Fresh basil leaves',
        LAST_INSERT_ID()
    );

-- insert Chocolate Chip Cookie recipe
INSERT INTO
    Recipe (title, description, image_url)
VALUES
    (
        'Chocolate Chip Cookies',
        "Chocolate chip cookies are a classic American dessert that are loved by many. These cookies are typically made with a dough that is loaded with chocolate chips, resulting in a deliciously sweet and gooey texture. The dough is usually made with ingredients such as flour, sugar, butter, eggs, and vanilla extract. Many recipes also call for brown sugar, which adds a depth of flavor to the cookies. Chocolate chip cookies can be enjoyed warm right out of the oven, or at room temperature with a cold glass of milk.",
        'https://static01.nyt.com/images/2022/02/12/dining/JT-Chocolate-Chip-Cookies/JT-Chocolate-Chip-Cookies-threeByTwoMediumAt2X.jpg'
    );

INSERT INTO
    Instructions (steps, recipe_id)
VALUES
    (
        '1. Preheat oven to 375°F.
2. In a large bowl, cream together butter, white sugar, and brown sugar until smooth.
3. Beat in eggs one at a time, then stir in vanilla.
4. In a separate bowl, whisk together flour, baking soda, and salt.
5. Gradually add flour mixture to butter mixture and mix until just combined.
6. Stir in chocolate chips.
7. Drop dough by rounded tablespoonfuls onto ungreased baking sheets.
8. Bake for 8 to 10 minutes, or until lightly golden brown. Enjoy!',
        LAST_INSERT_ID()
    );

INSERT INTO
    Item (amount, name, Recipe_id)
VALUES
    ('1 cup', 'Butter, softened', LAST_INSERT_ID()),
    ('1/2 cup', 'White sugar', LAST_INSERT_ID()),
    ('1 cup', 'Brown sugar, packed', LAST_INSERT_ID()),
    ('2', 'Eggs', LAST_INSERT_ID()),
    ('2 tsp', 'Vanilla extract', LAST_INSERT_ID()),
    ('3 cups', 'All-purpose flour', LAST_INSERT_ID()),
    ('1 tsp', 'Baking soda', LAST_INSERT_ID()),
    ('1/2 tsp', 'Salt', LAST_INSERT_ID()),
    (
        '2 cups',
        'Semisweet chocolate chips',
        LAST_INSERT_ID()
    );

-- insert Butter Noodles recipe
INSERT INTO
    Recipe (title, description, image_url)
VALUES
    (
        'Butter Noodles',
        "Butter noodles are a simple and comforting pasta dish that's perfect for a quick and easy meal. The dish typically consists of boiled egg noodles tossed with butter, salt, and pepper, and sometimes topped with grated Parmesan cheese or fresh parsley. The butter adds richness and a creamy texture to the noodles, while the Parmesan cheese provides a savory umami flavor. This classic dish is a staple for many families and a go-to for those looking for a satisfying and easy-to-make meal.",
        'https://static.onecms.io/wp-content/uploads/sites/43/2022/04/27/244458-ButteredNoodles-0692-2X3.jpg'
    );

INSERT INTO
    Instructions (steps, recipe_id)
VALUES
    (
        '1. Bring a large pot of salted water to a boil.
2. Cook pasta according to package directions until al dente.
3. Drain pasta and return to pot.
4. Add butter and garlic to pasta and toss until butter is melted.
5. Stir in Parmesan cheese and season with salt and pepper.
6. Serve hot. Enjoy!',
        LAST_INSERT_ID()
    );

INSERT INTO
    Item (amount, name, Recipe_id)
VALUES
    ('1 pound', 'Pasta', LAST_INSERT_ID()),
    ('1/2 cup', 'Butter', LAST_INSERT_ID()),
    ('2 cloves', 'Garlic, minced', LAST_INSERT_ID()),
    (
        '1/2 cup',
        'Grated Parmesan cheese',
        LAST_INSERT_ID()
    );

-- insert Chicken Noodle Soup recipe
INSERT INTO
    Recipe (title, description, image_url)
VALUES
    (
        'Chicken Noodle Soup',
        "Chicken noodle soup is a classic comfort food that is perfect for cold or rainy days. This soup typically contains chicken broth, chicken pieces, and noodles, along with a variety of vegetables such as carrots, celery, and onions. It is often seasoned with herbs and spices such as thyme, bay leaves, and black pepper. Chicken noodle soup is known for its soothing and comforting qualities, and is often used as a home remedy for cold and flu symptoms. It is a simple yet satisfying dish that can be enjoyed on its own or paired with crusty bread.",
        'https://images-gmi-pmc.edge-generalmills.com/6722e8f1-83b3-4c86-890e-21c58ce32edb.jpg'
    );

INSERT INTO
    Instructions (steps, recipe_id)
VALUES
    (
        '1. In a large pot over medium heat, combine chicken, chicken broth, water, carrots, celery, onion, bay leaf, thyme, salt, and pepper.
2. Bring to a boil, then reduce heat and simmer until chicken is cooked through, about 15 minutes.
3. Remove chicken from pot and shred with two forks.
4. Return chicken to pot and add egg noodles.
5. Cook until noodles are tender, about 10 minutes.
6. Remove bay leaf and serve hot. Enjoy!',
        LAST_INSERT_ID()
    );

INSERT INTO
    Item (amount, name, Recipe_id)
VALUES
    ('1 pound', 'Chicken breasts', LAST_INSERT_ID()),
    ('8 cups', 'Chicken broth', LAST_INSERT_ID()),
    ('4 cups', 'Water', LAST_INSERT_ID()),
    (
        '2',
        'Carrots, peeled and sliced',
        LAST_INSERT_ID()
    ),
    ('2 stalks', 'Celery, sliced', LAST_INSERT_ID()),
    ('1', 'Onion, diced', LAST_INSERT_ID()),
    ('1', 'Bay leaf', LAST_INSERT_ID()),
    ('1/2 tsp', 'Dried thyme', LAST_INSERT_ID()),
    ('1 tsp', 'Salt', LAST_INSERT_ID()),
    ('1/2 tsp', 'Pepper', LAST_INSERT_ID()),
    ('2 cups', 'Egg noodles', LAST_INSERT_ID());

-- insert Butter Chicken Curry recipe
INSERT INTO
    Recipe (title, description, image_url)
VALUES
    (
        'Butter Chicken Curry',
        "Butter chicken curry is a classic Indian dish consisting of succulent chicken pieces cooked in a creamy tomato-based sauce. The chicken is marinated in a blend of aromatic spices, including turmeric, garam masala, and cumin, and then sautéed until golden brown. The sauce is made with butter, cream, and tomatoes, creating a rich and flavorful base that complements the chicken. The dish is typically served over steaming basmati rice, with naan bread on the side. With its complex flavors and creamy texture, butter chicken curry is a delicious and satisfying meal.",
        'https://www.danishfoodlovers.com/wp-content/uploads/2022/09/Butter-chicken-3.jpg'
    );

INSERT INTO
    Instructions (steps, recipe_id)
VALUES
    (
        '1. In a large skillet over medium heat, heat oil.
2. Add onion and cook until soft, about 5 minutes.
3. Add garlic, ginger, garam masala, cumin, and turmeric and cook until fragrant, about 1 minute.
4. Add tomato paste and cook until darkened in color, about 2 minutes.
5. Add chicken and season with salt and pepper.
6. Cook until chicken is no longer pink, about 10 minutes.
7. Stir in heavy cream and simmer until sauce has thickened, about 5 minutes.
8. Serve hot with rice and naan. Enjoy!',
        LAST_INSERT_ID()
    );

INSERT INTO
    Item (amount, name, Recipe_id)
VALUES
    ('1 tbsp', 'Vegetable oil', LAST_INSERT_ID()),
    ('1', 'Onion, diced', LAST_INSERT_ID()),
    ('2 cloves', 'Garlic, minced', LAST_INSERT_ID()),
    (
        '1 tbsp',
        'Fresh ginger, minced',
        LAST_INSERT_ID()
    ),
    ('1 tbsp', 'Garam masala', LAST_INSERT_ID()),
    ('1 tsp', 'Ground cumin', LAST_INSERT_ID()),
    ('1 tsp', 'Ground turmeric', LAST_INSERT_ID()),
    ('1 tbsp', 'Tomato paste', LAST_INSERT_ID()),
    (
        '1 pound',
        'Chicken breasts, cut into 1" pieces',
        LAST_INSERT_ID()
    ),
    ('1 cup', 'Heavy cream', LAST_INSERT_ID());

-- insert Chicken Parmesan recipe
INSERT INTO
    Recipe (title, description, image_url)
VALUES
    (
        'Chicken Parmesan',
        "Chicken Parmesan, also known as Chicken Parmigiana, is a classic Italian-American dish that features breaded and fried chicken cutlets topped with tomato sauce, melted mozzarella cheese, and grated Parmesan cheese. The chicken is usually seasoned with herbs and spices, and the tomato sauce is often made with garlic, onions, and basil. Served with a side of spaghetti or other pasta, this hearty and comforting dish is a favorite in many Italian restaurants and home kitchens alike.",
        'https://www.southernliving.com/thmb/rQaGDkAPGa_MeU4eglrAaeuexjg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/southern-living-chicken-parmesan-ddmfs-0047-fe218cb392784e79bfb4bb586685d6f9.jpg'
    );

INSERT INTO
    Instructions (steps, recipe_id)
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
10. Serve hot with pasta. Enjoy!',
        LAST_INSERT_ID()
    );

INSERT INTO
    Item (amount, name, Recipe_id)
VALUES
    ('1 cup', 'Breadcrumbs', LAST_INSERT_ID()),
    (
        '1/2 cup',
        'Grated Parmesan cheese',
        LAST_INSERT_ID()
    ),
    ('2', 'Eggs', LAST_INSERT_ID()),
    ('1/4 cup', 'Milk', LAST_INSERT_ID()),
    ('4', 'Chicken breasts', LAST_INSERT_ID()),
    ('1/2 cup', 'Flour', LAST_INSERT_ID()),
    ('1/4 cup', 'Vegetable oil', LAST_INSERT_ID()),
    ('2 cups', 'Tomato sauce', LAST_INSERT_ID()),
    (
        '1 cup',
        'Shredded mozzarella cheese',
        LAST_INSERT_ID()
    );

-- insert Chimichangas recipe
INSERT INTO
    Recipe (title, description, image_url)
VALUES
    (
        'Chimichangas',
        "Chimichangas are a popular Mexican dish made by filling flour tortillas with a variety of ingredients such as seasoned beef, chicken, cheese, rice, and beans. The tortillas are then deep-fried until crispy and golden brown, resulting in a deliciously crunchy exterior that contrasts with the tender filling. Chimichangas are often served with a side of guacamole, salsa, and sour cream for dipping, and can be customized to suit individual tastes with additional toppings like lettuce, tomatoes, and jalapenos. They make for a satisfying and flavorful meal that's perfect for a fiesta or any casual gathering.",
        'https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2022/05/Chimichangas-20.jpg'
    );

INSERT INTO
    Instructions (steps, recipe_id)
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
13. Serve hot with sour cream and salsa. Enjoy!',
        LAST_INSERT_ID()
    );

INSERT INTO
    Item (amount, name, Recipe_id)
VALUES
    ('1 tbsp', 'Vegetable oil', LAST_INSERT_ID()),
    ('1', 'Onion, diced', LAST_INSERT_ID()),
    ('1 pound', 'Ground beef', LAST_INSERT_ID()),
    ('1 packet', 'Taco seasoning', LAST_INSERT_ID()),
    ('1/4 cup', 'Water', LAST_INSERT_ID()),
    ('1 can', 'Refried beans', LAST_INSERT_ID()),
    ('To taste', 'Salt', LAST_INSERT_ID()),
    ('To taste', 'Pepper', LAST_INSERT_ID()),
    ('4', 'Flour tortillas', LAST_INSERT_ID()),
    (
        '1 cup',
        'Shredded cheddar cheese',
        LAST_INSERT_ID()
    ),
    ('1/4 cup', 'Vegetable oil', LAST_INSERT_ID()),
    ('For serving', 'Sour cream', LAST_INSERT_ID()),
    ('For serving', 'Salsa', LAST_INSERT_ID());