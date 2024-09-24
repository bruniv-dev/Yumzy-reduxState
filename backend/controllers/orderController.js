import Razorpay from "razorpay";
import dotenv from "dotenv";
import orderModel from "../models/order.js";
import userModel from "../models/user.js";

dotenv.config({ path: ".env" });

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Place Order Controller
export const placeOrder = async (req, res) => {
  try {
    console.log("Incoming order data:", req.body); // Log incoming request data

    const { userId, items, amount, address } = req.body;

    // Validate request data
    if (!userId || !items || items.length === 0 || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request data" });
    }

    // Create a new order in the database
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    // Clear user's cart data
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Convert amount to paise (smallest currency unit for INR)
      currency: "INR",
      receipt: `order_${newOrder._id}`, // Use new order ID as receipt
    });

    console.log("Razorpay order created:", razorpayOrder); // Log Razorpay order details

    // Send Razorpay order details back to frontend
    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error placing order:", error); // Log error
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message, // Provide more detailed error message
    });
  }
};

export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    //while calling api, pass success as string
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid Successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    res.json({ success: false, message: "Error" });
    console.log(error);
  }
};

//user orders for frontend
export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: "Error" });
    console.log(error);
  }
};

//list of order for admin
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: "Error" });
    console.log(error);
  }
};

//api for updating order status
export const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
