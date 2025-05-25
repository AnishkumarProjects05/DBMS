const Product = require("../models/Product");

// Create a product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Products fetched", products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product fetched", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error });
  }
};

module.exports = { createProduct, getProducts, getProductById };
