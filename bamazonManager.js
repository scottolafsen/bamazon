var mysql = require("mysql");
var inquirer = require("inquirer");

var inventoryAmount;
var productId;
var currentInventory;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Snowbird1",
    database: "bamazon_db"
});

connect();
function connect() {
    connection.connect(function (err) {
        if (err) throw err;
    });
    prompt();
}

function prompt() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choices",
                message: "What would you like to do",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Leave"]
            },

        ])
        .then(answers => {
            switch (answers.choices) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":

                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                case "Leave":
                    process.exit();
                    break;
                default:
                // code block
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("************Items For Sale**************")
        console.log("ID        | Product Name  | Department | Price | Items in Stock ");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + "         | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("--------------------------------------------------");
        prompt();
    });

}

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log(res[i].id + "         | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            } else { continue }
        }
        console.log("--------------------------------------------------");
        prompt();
    });

}

function addInventory() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "product",
                message: "Which item ID would you like to add inventory?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("choose number")
                    return false;
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How much would you like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("choose number")
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                productId = parseInt(answer.product)
                inventoryAmount = parseInt(answer.quantity)
                for (var i = 0; i < res.length; i++) {
                    if (productId === res[i].id) {
                        currentInventory = res[i].stock_quantity
                        itemAdd();
                        return
                    }
                }
                console.log("that product does not exist")
                addInventory();
            }
            );
        });
}
function itemAdd() {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: inventoryAmount + currentInventory
            },
            {
                id: productId
            }
        ],
        function (err, res) {
        }

    );
    prompt();
}
function addProduct() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the product name?"
            },
            {
                name: "department",
                type: "input",
                message: "What department of item?"
            },
            {
                name: "price",
                type: "input",
                message: "What is price of item?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock",
                type: "input",
                message: "How many items?"
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.item,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stock
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your item was posted succesfully!");
                    prompt();
                }
            );
        });

}
