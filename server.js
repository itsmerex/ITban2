const faker = require("faker");
const mysql = require("mysql");

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e_commerce",
});

// Generate 500 customer
for (let i = 0; i < 500; i++) {
  const firstName = faker.name.firstName();
  const middleName = faker.name.middleName();
  const lastName = faker.name.lastName();
  const address = {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zipCode: faker.address.zipCode(),
  };

  const sql = `INSERT INTO customers (firstname, middlename, lastname, address) VALUES (?, ?, ?, ?)`;

  connection.query(
    sql,
    [firstName, middleName, lastName, JSON.stringify(address)],
    (err) => {
      if (err) throw err;
      console.log("Customer ", i + 1, " inserted!");
    }
  );
}

//Generate 2500 products
for (let i = 0; i < 2500; i++) {
  const name = faker.commerce.productName();
  const description = faker.commerce.productDescription();
  const attributes = {
    material: faker.commerce.productMaterial(),
    color: faker.commerce.color(),
    price: faker.commerce.price(),
  };

  const sql = `INSERT INTO products (name, description, attributes) VALUES (?, ?, ?)`;

  connection.query(
    sql,
    [name, description, JSON.stringify(attributes)],
    (err) => {
      if (err) throw err; // Handle errors gracefully (optional)
      console.log("Product ", i + 1, " inserted!");
    }
  );
}

//Generate 1500 orders
for (let i = 0; i < 1500; i++) {
  const customerId = faker.random.number({ min: 1, max: 500 });
  const orderDate = faker.date.recent();

  const sql = `INSERT INTO orders (customer_id, order_date) VALUES (?, ?)`;

  connection.query(sql, [customerId, orderDate], (err) => {
    if (err) throw err;
    console.log("Order ", i + 1, " inserted!");
  });
}

//Generate 1500 order details
for (let i = 0; i < 1500; i++) {
  const orderId = faker.random.number({ min: 1, max: 1500 });
  const productId = faker.random.number({ min: 1, max: 2500 });
  const quantity = faker.random.number({ min: 1, max: 100 });
  const price = faker.commerce.price();

  const sql = `INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`;

  connection.query(sql, [orderId, productId, quantity, price], (err) => {
    if (err) throw err;
    console.log("Order Detail", i + 1, " inserted!");
  });
}

// Close MySQL connection
connection.end();
