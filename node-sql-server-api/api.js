var Orders = require('./models/products');
const dboperations = require('./dbconfig');

dboperations.getData("SELECT * FROM PRODUCTS").then((data) => {
console.log(data);
}).catch((err) => {
    console.log(err);
});