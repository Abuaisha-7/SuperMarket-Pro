const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data storage (replace with database in production)
let products = [
  {
    id: 1,
    name: "Fresh Milk",
    category: "Dairy",
    price: 3.99,
    stock: 50,
    unit: "liters",
    supplier: "Local Dairy Farm",
    expiryDate: "2024-02-15"
  },
  {
    id: 2,
    name: "Whole Wheat Bread",
    category: "Bakery",
    price: 2.49,
    stock: 30,
    unit: "loaves",
    supplier: "Artisan Bakery",
    expiryDate: "2024-02-10"
  },
  {
    id: 3,
    name: "Organic Bananas",
    category: "Produce",
    price: 1.99,
    stock: 25,
    unit: "kg",
    supplier: "Fresh Fruits Co.",
    expiryDate: "2024-02-08"
  }
];

let sales = [
  {
    id: 1,
    productId: 1,
    productName: "Fresh Milk",
    quantity: 2,
    totalPrice: 7.98,
    date: "2024-02-01",
    cashier: "John Doe"
  }
];

let users = [
  {
    id: 1,
    username: "admin",
    password: "admin123", // In production, use hashed passwords
    role: "admin",
    name: "Administrator"
  },
  {
    id: 2,
    username: "cashier",
    password: "cashier123",
    role: "cashier",
    name: "John Doe"
  }
];

// Authentication middleware
const authenticateUser = (req, res, next) => {
  const { username, password } = req.headers;
  
  if (!username || !password) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  req.user = user;
  next();
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SuperMarket-Pro Backend is running!' });
});

// Authentication
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // In production, return JWT token
  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name
    }
  });
});

// Products API
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

app.post('/api/products', authenticateUser, (req, res) => {
  const { name, category, price, stock, unit, supplier, expiryDate } = req.body;
  
  if (!name || !category || !price || !stock) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name,
    category,
    price: parseFloat(price),
    stock: parseInt(stock),
    unit: unit || 'units',
    supplier: supplier || 'Unknown',
    expiryDate: expiryDate || null
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', authenticateUser, (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const updatedProduct = { ...products[productIndex], ...req.body };
  products[productIndex] = updatedProduct;
  
  res.json(updatedProduct);
});

app.delete('/api/products/:id', authenticateUser, (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted successfully' });
});

// Sales API
app.get('/api/sales', (req, res) => {
  res.json(sales);
});

app.post('/api/sales', authenticateUser, (req, res) => {
  const { productId, quantity, cashier } = req.body;
  
  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  if (product.stock < quantity) {
    return res.status(400).json({ error: 'Insufficient stock' });
  }
  
  // Update product stock
  product.stock -= quantity;
  
  const newSale = {
    id: sales.length > 0 ? Math.max(...sales.map(s => s.id)) + 1 : 1,
    productId: parseInt(productId),
    productName: product.name,
    quantity: parseInt(quantity),
    totalPrice: product.price * quantity,
    date: new Date().toISOString().split('T')[0],
    cashier: cashier || req.user.name
  };
  
  sales.push(newSale);
  res.status(201).json(newSale);
});

// Inventory reports
app.get('/api/inventory/low-stock', (req, res) => {
  const lowStockProducts = products.filter(p => p.stock < 10);
  res.json(lowStockProducts);
});

app.get('/api/inventory/category/:category', (req, res) => {
  const categoryProducts = products.filter(p => 
    p.category.toLowerCase() === req.params.category.toLowerCase()
  );
  res.json(categoryProducts);
});

// Sales reports
app.get('/api/reports/daily/:date', (req, res) => {
  const dailySales = sales.filter(s => s.date === req.params.date);
  const totalRevenue = dailySales.reduce((sum, sale) => sum + sale.totalPrice, 0);
  
  res.json({
    date: req.params.date,
    sales: dailySales,
    totalRevenue,
    totalSales: dailySales.length
  });
});

app.get('/api/reports/monthly/:month', (req, res) => {
  const monthSales = sales.filter(s => s.date.startsWith(req.params.month));
  const totalRevenue = monthSales.reduce((sum, sale) => sum + sale.totalPrice, 0);
  
  res.json({
    month: req.params.month,
    sales: monthSales,
    totalRevenue,
    totalSales: monthSales.length
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SuperMarket-Pro Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🛍️  Products API: http://localhost:${PORT}/api/products`);
  console.log(`💰 Sales API: http://localhost:${PORT}/api/sales`);
});

module.exports = app;
