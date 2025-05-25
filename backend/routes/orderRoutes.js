const express = require("express");
const router = express.Router();

// ✅ Correct import
const { placeOrder, getOrders,deleteOrder,updateOrder , createOrder } = require("../controllers/OrderController");
const auth = require("../middleware/authMiddleware");
const {protect, authMiddleware} = require("../middleware/authMiddleware");
// ✅ Register route with a FUNCTION
router.post("/", placeOrder);
router.get("/getOrders", protect, authMiddleware, getOrders);
router.delete("/:id", protect, authMiddleware, deleteOrder);
router.put("/:id", protect, authMiddleware, updateOrder);
router.post('/orders', protect, authMiddleware, createOrder);

module.exports = router;
