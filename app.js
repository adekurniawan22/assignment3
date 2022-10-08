const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const ProductController = require('./controller/Product');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', ProductController.getAllProduct);
app.post('/create', ProductController.createProduct);
app.get('/products/:id', ProductController.getProductById);

// app.listen(PORT, () => {
//     console.log(`Server running in http://localhost:${PORT}/products`)
// })

module.exports = app;