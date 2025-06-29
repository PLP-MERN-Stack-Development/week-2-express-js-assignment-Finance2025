// server.js - Starter Express server for Week 2 assignment

// ✅ Load environment variables
require('dotenv').config();

// ✅ Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// ✅ Import middleware
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// ✅ Initialize Express app
const app = express();

// ✅ Use PORT from environment or fallback to 3000
const PORT = process.env.PORT || 3000;

// ✅ Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(logger); 

// ✅ Sample in-memory product database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// ✅ GET all products with filtering, search, pagination
app.get('/api/products', (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;

  let filteredProducts = [...products];

  if (category) {
    filteredProducts = filteredProducts.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json(paginatedProducts);
});

// ✅ POST - Create a new product (protected by API key)
app.post('/api/products', auth, (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || !price || !category || inStock === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// ✅ PUT - Update a product 
app.put('/api/products/:id', auth, (req, res) => {
  const productId = req.params.id;
  const { name, description, price, category, inStock } = req.body;

  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products[productIndex] = {
    id: productId,
    name,
    description,
    price,
    category,
    inStock
  };

  res.json({ message: 'Product updated successfully', product: products[productIndex] });
});

// ✅ DELETE - Remove a product 
app.delete('/api/products/:id', auth, (req, res) => {
  const productId = req.params.id;

  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deletedProduct = products.splice(productIndex, 1);

  res.json({ message: 'Product deleted successfully', deleted: deletedProduct[0] });
});

// ✅ Product stats by category
app.get('/api/products/stats', (req, res) => {
  const stats = {};

  products.forEach(product => {
    const category = product.category.toLowerCase();
    stats[category] = (stats[category] || 0) + 1;
  });

  res.json({ total: products.length, byCategory: stats });
});

// ✅ Simulated error for testing error handler
app.get('/error-test', (req, res) => {
  throw new Error('This is a simulated error');
});

// ✅ Error handler middleware
app.use(errorHandler);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Export app (for testing)
module.exports = app;