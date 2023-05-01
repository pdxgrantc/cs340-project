CREATE TABLE Recipe (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE Instructions (
    id INT(11) NOT NULL AUTO_INCREMENT,
    steps TEXT NOT NULL,
    recipe_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(id) ON DELETE CASCADE
);

CREATE TABLE Item (
    id INT(11) NOT NULL AUTO_INCREMENT,
    amount TEXT NOT NULL,
    name TEXT NOT NULL,
    recipe_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(id) ON DELETE CASCADE
);

CREATE TABLE `Users` (
    `id` varchar(28) NOT NULL,
    `display_name` TEXT NOT NULL,
    `email` varchar(48) NOT NULL,
    `photoURL` varchar(512) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Shopping_List` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `Item_id` INT(11) NOT NULL,
    `Users_id` varchar(28) NOT NULL,
    `Recipe_id` INT(11) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`Item_id`) REFERENCES `Item`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`Users_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`Recipe_id`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Recipe_has_users` (
    `Recipe_id` INT(11) NOT NULL,
    `Users_id` varchar(28) NOT NULL,
    PRIMARY KEY (`Recipe_id`, `Users_id`),
    FOREIGN KEY (`Recipe_id`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`Users_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE
);