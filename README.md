# sql-amazon-app

## Technologies
* Node.js
* Inquirer node.js module
* mySQL node.js module

# Description
This respository contains two applications, bamazonCustomer.js and bamazonManager.js. For either application to run 
correctly, the user must have a mySQL server and database with these parameters: Database Name: 'bamazon', Database Table:
'products', Database Rows: 'item_id', 'department_name', 'product_name', 'price', 'stock_quantity'. 

## bamazonCustomer.js
When you run bamazonCustomer.js, it will display the information currently in the 'bamazon' mySQL database, under the
'products' table. After it displays the products, it will prompt the user for the ID and the amount of the product they wish
to buy. If the amount requested is larger than the stock_quantity value of the selected product, it will return 'Insufficient
quantity', and will not continue. If the amount is under the stock_quantity value, it will update the product in the database,
and display the total price of the order and the remaining stock of the product.

## How to Use
1. Clone this repository onto your computer.
2. Open the command line (Git Bash, Terminal) and navigate to the sql-amazon-app folder.
![ScreenShot](/screenshots/customerNavigate.png)
3. Input the command 'node bamazonCustomer.js'.
![ScreenShot](/screenshots/customerCommand.png)
4. This will display the current products, and a prompt for the product ID, then the amount.
![ScreenShot](/screenshots/customerId.png)
![ScreenShot](/screenshots/customerAmount.png)
5. This will display the ID, the amount, the total price, and the remianing stock for the product.
![ScreenShot](/screenshots/customerFinal.png)

## bamazonManager.js
When you run bamazonManager.js, it will display a prompt with 4 different options, 'View Products for Sale', 'View Low 
Inventory', 'Add to inventory', and 'Add New Product'. 'View Products for Sale' will display the current 'products' table.
'View Low Inventory' will display all products with a stock_quantity value of less than 5. 'Add to Inventory' will allow the 
user to select a product by ID, and add more inventory, then will display the new stock of the product. 'Add New Product' will
allow the user to add a completely new product to the 'products' table through user prompts.

## How to Use
1. Clone this repository onto your computer.
2. Open the command line (Git Bash, Terminal) and navigate to the sql-amazon-app folder.
![ScreenShot](/screenshots/customerNavigate.png)
3. Input the command 'node bamazonManager.js'.
![ScreenShot](/screenshots/managerCommand.png)
4. This will display the 4 options.
![ScreenShot](/screenshots/managerDisplay.png)
5. If you select 'View Products for Sale', the products will display.
![ScreenShot](/screenshots/managerView.png)
6. If you select 'View Low Inventory', the items with low inventory will display.
![ScreenShot](/screenshots/managerLow.png)
7. If you select 'Add to Inventory', it will show the products, and prompt the user for the product ID and amount to add.
![ScreenShot](/screenshots/managerAdd.png)
8. If you select 'Add New Product', it will prompt the user for values for all rows in the 'products' table and add them to 
the table.
![ScreenShot](/screenshots/managerNew.png)
