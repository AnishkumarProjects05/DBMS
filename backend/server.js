const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const paymentRoutes = require('../backend/routes/paymentRoutes');



// Load environment variables
require('dotenv').config();


// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Basic Route for Testing
app.get('/', (req, res) => {
  res.send('✅ Grocery Platform API is up and running!');
});

//Payment Routes
app.use("/api/payments",paymentRoutes);

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
