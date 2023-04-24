CREATE TABLE IF NOT EXISTS "Shopping_List" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS "Instructions" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "Instructions" TEXT,
);

CREATE TABLE IF NOT EXISTS "Recipe" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" VARCHAR(45),
    "link" VARCHAR(512),
    "description" TEXT,
    "Instructions_id" INTEGER NOT NULL,
    FOREIGN KEY ("Instructions_id") REFERENCES "Instructions" ("id")
);

CREATE TABLE IF NOT EXISTS "Item" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "amount" VARCHAR(45),
    "name" VARCHAR(45),
    "Shopping List_id" INTEGER NOT NULL,
    "Recipe_id" INTEGER NOT NULL,
    FOREIGN KEY ("Shopping List_id") REFERENCES "Shopping_List" ("id"),
    FOREIGN KEY ("Recipe_id") REFERENCES "Recipe" ("id")
);

CREATE TABLE IF NOT EXISTS "Users" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "display_name" VARCHAR(256) NOT NULL,
    "photoURL" VARCHAR(512) NOT NULL,
    "Shopping_List_id" INTEGER NOT NULL,
    FOREIGN KEY ("Shopping_List_id") REFERENCES "Shopping_List" ("id")
);

CREATE TABLE IF NOT EXISTS "Recipe_has_users" (
    "Recipe_id" INTEGER NOT NULL,
    "Users_id" INTEGER NOT NULL,
    FOREIGN KEY ("Recipe_id") REFERENCES "Recipe" ("id"),
    FOREIGN KEY ("Users_id") REFERENCES "Users" ("id")
);