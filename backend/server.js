const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const paymentRoutes = require('../backend/routes/paymentRoutes');
const bodyParser = require('body-parser');



// Load environment variables
require('dotenv').config();


// Initialize Express App
const app = express();

// Connect to DB
connectDB();

// Middlewares
// app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// ✅ Body Parser
app.use(bodyParser.json());

// Basic Route for Testing
app.get('/', (req, res) => {
  res.send('✅ Grocery Platform API is up and running!');
});

app.use("/api/payments",paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


// Server Port
const PORT = process.env.PORT || 4001;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
