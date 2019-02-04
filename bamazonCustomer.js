var mysql = require("mysql");
var inquirer = require("inquirer");

var productId;
var productQuantity;
var maxQuantity;
var productName;
var productPrice;

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
        storeDisplay();
    });
}

function storeDisplay() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("************Items For Sale**************")
        console.log("ID        | Product Name  | Department | Price | Items in Stock ");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + "         | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("--------------------------------------------------");
        startPurchase();
    });
}

function startPurchase() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "product",
                message: "What product ID would you like Purchase",
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
                for (var i = 0; i < res.length; i++) {
                    if (productId === res[i].id) {

                        quantity();
                        return
                    }
                }
                console.log("that product does not exist")
                startPurchase();
            }
            );
        });
}

function quantity() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase",
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
            connection.query('SELECT * FROM `products` WHERE `id` = ?', [productId], function (err, res) {
                if (err) throw err;
                productQuantity = parseInt(answer.quantity)
                productName = res[0].product_name;
                productPrice = parseInt(res[0].price);
                maxQuantity = parseInt(res[0].stock_quantity)
                if (maxQuantity >= productQuantity) {
                    checkout();
                    return
                }
                console.log("Not enough in stock, max order is: " + maxQuantity);
                quantity();
            });
        });
}

function checkout() {
    var updateStock = maxQuantity - productQuantity;
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: updateStock
            },
            {
                id: productId
            }
        ],
        function (err, res) {
        }
    );
    console.log("you purchased " + productQuantity + " " + productName + " for a total of " + productPrice * productQuantity);
    postCheckout();
}

function postCheckout() {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "list",
                message: "Would you like to [leave] store or [shop] again?",
                choices: ["leave", "shop"]
            }
        ])
        .then(function (answer) {
            if (answer.choice === "leave") {
                process.exit();
            }
            if (answer.choice === "shop") {
                storeDisplay();
            }
        });
}
