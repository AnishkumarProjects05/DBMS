const express = require("express");
const router = express.Router();

// ✅ Correct import
const { placeOrder, getOrders,deleteOrder,updateOrder , createOrder } = require("../controllers/OrderController");
const auth = require("../middleware/authMiddleware");
// ✅ Register route with a FUNCTION
router.post("/", placeOrder);
router.get("/", getOrders);
router.delete("/:id",deleteOrder);
router.put("/:id",updateOrder);
router.post('/orders', createOrder);

module.exports = router;
