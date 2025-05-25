const Order = require("../models/Order");


const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // ✅ Step 1: Calculate totalAmount
    const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    // ✅ Step 2: Pass totalAmount when creating the order
    const order = await Order.create({ items, totalAmount });

    res.status(201).json({ message: 'Order placed', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order in create order', error });
  }
};

const placeOrder = async (req, res) => {
  try {
    console.log("Place Order Request Body:", req.body); // 🔐 Log the request body for debugging
    const { items, totalAmount } = req.body;
    const userId = req.body.userId;
    console.log("User ID:", userId); // 🔐 Log the user ID for debugging

    const newOrder = new Order({
      items,
      totalAmount,
      user: userId, // 🔐 Save the logged-in user ID
    });
    console.log("New Order:", newOrder);  
    await newOrder.save();

    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
};


const getOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Comes from auth middleware
    const orders = await Order.find({ user: userId });
    res.status(200).json({ message: "Orders fetched", orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

const deleteOrder  = async (req,res) => {
  try{
    const orderId = await Order.findByIdAndDelete(req.params.id);
    if(!orderId){
      return res.status(404).json({message:"Order note found"});
    }
    res.status(200).json({message:"Order Deleted Successfully"});

  }
  catch(error) {
    res.status(500).json({error:error.message});
  }


};
const updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order updated', order: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { placeOrder, getOrders,deleteOrder,updateOrder,createOrder };
