import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import orderModel from "../models/order.model.js";
import { redis } from "../utils/redis.js";


// Check product stock and handle insufficient stock
export const checkStockAndHandleInsufficiency = CatchAsyncError(async (cart) => {
    const insufficientStockItems = [];
    const updatedCart = [];
  
    for (const item of cart) {
      const product = await productModel.findById(item.product);
  
      if (!product) {
        throw new ErrorHandler("Product not found", 404);
      }
  
      if (product.stock < item.quantity) {
        insufficientStockItems.push({
          product: product._id,
          name: product.name,
          requestedQuantity: item.quantity,
          availableQuantity: product.stock,
        });
      } else {
        // Reduce the available stock
        product.stock -= item.quantity;
        await product.save();
  
        updatedCart.push({
          product: product._id,
          name: product.name,
          quantity: item.quantity,
          price: product.price,
        });
      }
    }
  
    return { insufficientStockItems, updatedCart };
  });
  
// Calculate order total
export const calculateOrderTotal = (updatedCart) => {
    return updatedCart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };
  
// Create and save a new order
export const createAndSaveOrder = CatchAsyncError(async (userId, cart, orderTotal) => {
    const newOrder = new orderModel({
      user: userId,
      cart,
      totalPrice: orderTotal,
      status: "Processing",
    });
  
    await newOrder.save();
    return newOrder;
  });


// Get all orders
export const getAllOrdersService = async (res) => {
  try {
    const cachedData = await redis.get("allOrders");

    if (cachedData) {
      const orders = JSON.parse(cachedData);
      return res.status(200).json({
        success: true,
        source: "cache",
        total: orders.length,
        orders,
      });
    }

    const orders = await orderModel.find().sort({ createdAt: -1 });

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No orders found in the database",
      });
    }

    await redis.set("allOrders", JSON.stringify(orders), "EX", 3600); // 1 hour

    return res.status(200).json({
      success: true,
      source: "database",
      total: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error accessing the database",
    });
  }
};





