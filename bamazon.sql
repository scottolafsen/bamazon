DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price INTEGER(50) NULL,
    stock_quantity INTEGER(50) NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scarpa Alien RS", "Ski Boots", 869.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scarpa F1", "Ski Boots", 699.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scarpa Maestrale", "Ski Boots", 694.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scarpa Maestrale RS", "Ski Boots", 794.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scarpa Freedom RS", "Ski Boots", 829.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black Diamond Helio 116", "Skis", 949.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black Diamond Helio 105", "Skis", 879.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black Diamond Helio 88", "Skis", 829.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black Diamond Helio 76", "Skis", 799.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black Diamond Helio 95", "Skis", 849.95, 10);