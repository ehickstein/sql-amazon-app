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
    inquirerFunction();
});

// Inquirer prompt, receiving input from the user
function inquirerFunction(){
    inquirer.prompt([
        {
            type: "list",
            message: "Welcome Bamazon manager, what would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "input"
        }
    // After we receive the input, we use if statements based on what they selected
    ]).then(function(res){
        // For "View Products for Sale", we display the current contents of the database
        if(res.input == "View Products for Sale"){
            console.log("Here are all of the products available for sale.");
            connection.query("SELECT * FROM products", function(err,response){
                if (err) console.log(err);
                console.log(response);
            })
            connection.end();
        }
        // For "View Low Inventory", we display all items with stock_quantity < 5
        else if(res.input == "View Low Inventory"){
            console.log("Here are all of the products with low inventory.");
            connection.query(
                "SELECT * FROM products WHERE stock_quantity<5",
                function(err,response){
                if (err) console.log(err);
                console.log(response);
            })
            connection.end();
        }
        // For "Add to Inventory", we first select the correct row with an inquirer
        else if(res.input == "Add to Inventory"){
            console.log("Here are all of the products available for sale.");
            connection.query("SELECT * FROM products", function(err,response){
                if (err) console.log(err);
                console.log(response);
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Which item ID would you like to add to?",
                        name: "addId"
                    },
                    {
                        type: "input",
                        message: "How many would you like to add?",
                        name: "addNum"
                    }
                ]).then(function(addRes){
                    connection.query("SELECT * FROM products WHERE ?",
                    {
                        item_id: parseInt(addRes.addId)
                    },
                    // Then we update that row with the new stock_quantity value
                    function(err,qRes){
                        if (err) console.log(err);
                        var newStock = qRes[0].stock_quantity + parseInt(addRes.addNum);
                        connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newStock
                            },
                            {
                                item_id: parseInt(addRes.addId)
                            }
                        ],
                        // Then we display the new stock_quantity value
                        function(err, uRes){
                            if (err) console.log(err);
                            console.log("New stock: " + newStock);
                            connection.end();
                        }
                        )
                    }
                    )
                })
            })
        }
        // For "Add New Product", we insert a product based on the user input
        else if(res.input == "Add New Product"){
            inquirer.prompt([
                {
                    type: "input",
                    message: "Which department does this product belong to?",
                    name: "dept"
                },
                {
                    type: "input",
                    message: "What is the name of the product?",
                    name: "prod"
                },
                {
                    type: "input",
                    message: "What is the price of the product?",
                    name: "price"
                },
                {
                    type: "input",
                    message: "How many of the product would you like to add?",
                    name: "stock"
                }
            ]).then(function(aRes){
                connection.query("INSERT INTO products SET ?",
                {
                    department_name: aRes.dept,
                    product_name: aRes.prod,
                    price: aRes.price,
                    stock_quantity: aRes.stock
                },
                function(err, nRes){
                    if (err) console.log(err);
                    console.log(nRes.affectedRows + " product created.");
                }
                )
                connection.end();
            })
        }
        // This error should never happen because of the inquirer list
        else{
            console.log("Error, please reload the app and try again");
        }
    })
}
