// Getting node.js modules
var inquirer = require("inquirer");
var mysql = require("mysql");

// Creating the mySQL server variable
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 8889,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
});

// Connecting to the server
connection.connect(function(err) {
    if (err) console.log(err);
    console.log("connected as id " + connection.threadId + "\n");
});

//Displays the current products
console.log("Here are the products ready to be purchased.");
connection.query("SELECT * FROM products", function(err,response){
    if (err) console.log(err);
    console.log(response);
    inquirerFunction();
})

// Inquirer prompt, receiving input from the user
function inquirerFunction(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the product you would like to buy?",
            name: "id"
        },
        {
            type: "input",
            message: "How many would you like to buy?",
            name: "product"
        }
    // After we receive the input, we select the correct row from the database
    ]).then(function(res){
        connection.query(
            "SELECT * FROM products WHERE ?",
            {
                item_id: parseInt(res.id)
            },
            // pRes will refer to the result of the SELECT query
            function(err, pRes){
                if (err) console.log(err);
                console.log("Product ID: " + res.id);
                console.log("Amount: " + res.product);
                // If the user orders too many of a product, this will display
                if (parseInt(res.product) > pRes[0].stock_quantity){
                    console.log("Insufficient quantity, try again with a correct value.");
                    connection.end();
                }
                else {
                    // This will update the database values to reduce the stock_quantity
                    // to keep the database correct when the user buys a product
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: pRes[0].stock_quantity - parseInt(res.product)
                            },
                            {
                                item_id: parseInt(res.id)
                            }
                        ]
                    );
                    // Then we select the updated row and display the price and remaining stock
                    connection.query(
                        "SELECT * FROM products WHERE ?",
                        {
                            item_id: parseInt(res.id)
                        },
                        // sRes refers to the updated row
                        function(err, sRes){
                            if (err) console.log(err);
                            var finalPrice = pRes[0].price * parseInt(res.product);
                            console.log("Your price is " + finalPrice);
                            console.log("Stock remaining: " + sRes[0].stock_quantity);
                        }
                    );
                    connection.end();
                };
            }
        )
    }) 
}
