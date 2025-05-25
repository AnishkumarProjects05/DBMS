const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProductById } = require('../controllers/productController');
const {authMiddleware,  protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected route for product creation
router.post('/', protect, authMiddleware, createProduct);

module.exports = router;
