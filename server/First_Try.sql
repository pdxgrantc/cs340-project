CREATE TABLE `Shopping_List` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Instructions` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `steps` TEXT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Recipe` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `image_url` TEXT,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Item` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `amount` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `Recipe_id` INT(11) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`Recipe_id`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Users` (
    `id` varchar(28) NOT NULL,
    `display_name` TEXT NOT NULL,
    `photoURL` varchar(512),
    PRIMARY KEY (`id`)
);

CREATE TABLE `Recipe_has_users` (
    `Recipe_id` INT(11) NOT NULL,
    `Users_id` varchar(28) NOT NULL,
    PRIMARY KEY (`Recipe_id`, `Users_id`),
    FOREIGN KEY (`Recipe_id`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`Users_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE
);
