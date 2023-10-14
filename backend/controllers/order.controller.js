import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import notificationModel from "../models/notification.model.js";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail.js";
import { getAllOrdersService } from "../services/order.service.js";
import { redis } from "../utils/redis.js";
import dotenv from "dotenv";
// import stripeModule from "stripe";
import { isValidObjectId } from "mongoose";

dotenv.config();

// const stripe = stripeModule(process.env.STRIPE_SECRET_KEY);

// Check product stock and handle insufficient stock
const checkStockAndHandleInsufficiency = async (cart) => {
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
};

// Calculate order total
const calculateOrderTotal = (updatedCart) => {
  return updatedCart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};

// Function to check payment authorization
const checkPaymentAuthorization = async (payment_info) => {
  if (!payment_info || !payment_info.id || !payment_info.status) {
    throw new ErrorHandler("Invalid payment information", 400);
  }

  // Verify payment status
  if (payment_info.status !== "succeeded") {
    throw new ErrorHandler("Payment not authorized!", 400);
  }
};

// Create a function to send order confirmation email
const sendOrderConfirmationEmail = async (user, newOrder) => {
  try {
    await sendMail({
      email: user.email,
      subject: "Order Confirmation",
      template: "order-confirmation.ejs",
      data: { newOrder },
    });
  } catch (error) {
    throw new ErrorHandler(error.message, 400);
  }
};

// get all orders (for admin)
export const getAllOrders = CatchAsyncError(async (req, res, next) => {
  try {
    await getAllOrdersService(res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// get order details (for admin)
export const getOrderDetails = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    if (!isValidObjectId(orderId)) {
      return next(new ErrorHandler("Invalid order ID", 400));
    }

    let orders = [];

    const cachedData = await redis.get("allOrders");

    if (cachedData) {
      orders = JSON.parse(cachedData);
      const order = orders.find((o) => o._id === orderId);
      if (order) {
        return res.status(200).json({
          success: true,
          order,
          source: "cache",
        });
      }
    }

    const order = await orderModel.findById(orderId); // fetching from db

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    } else {
      orders.push(order); // Set the fetched order in the cache for future use
      await redis.set("allOrders", JSON.stringify(orders), "EX", 25200); // 7 hours

      return res.status(200).json({
        success: true,
        order,
        source: "database",
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get orders of user (for admin)
export const getOrdersByUserIdForAdmin = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(req.params);

      if (!isValidObjectId(id)) {
        return next(new ErrorHandler("Invalid user ID.", 400));
      }

      const cachedData = await redis.get(id);

      if (cachedData) {
        const user = JSON.parse(cachedData);
        const orders = user.orders || [];
        return res.status(200).json({
          success: true,
          orders,
          source: "cache",
        });
      }

      const user = await userModel.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found.", 404));
      }

      const orders = user.orders;

      if (!orders || orders.length === 0) {
        return next(new ErrorHandler("No orders found for this user.", 404));
      }

      await redis.set(userId, JSON.stringify(user), "EX", 3600); // 1 hour

      res.status(200).json({
        success: true,
        orders,
        source: "database",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//create order (for user)
export const createOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const { cart, shippingAddress, paymentMethod, payment_info } = req.body;
    const userId = req.user?._id;

    const user = await userModel.findById(userId);

    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }

    const { insufficientStockItems, updatedCart } =
      await checkStockAndHandleInsufficiency(cart);

    if (insufficientStockItems.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Some items have insufficient stock.",
        insufficientStockItems,
        updatedCart,
      });
    }

    const orderTotal = calculateOrderTotal(updatedCart);

    await checkPaymentAuthorization(payment_info); // Check payment authorization

    const newOrder = new orderModel({
      user: user?._id,
      cart: updatedCart,
      totalPrice: orderTotal,
      status: "Processing",
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      paidAt: payment_info.status === "succeeded" ? new Date() : null,
    });

    await newOrder.save(); // Save the new order to the database

    user.orders.push(newOrder);
    await user.save(); // updated user data in the database
    await redis.set(req.user?._id, JSON.stringify(user)); // updated user data in Redis

    const cachedData = await redis.get(`UserOrders - ${userId}`);

    if(!cachedData){
        const userOrders = [newOrder];
        await redis.set(`UserOrders - ${userId}`, JSON.stringify(userOrders)); //TODO: add expiration time
    } else{
        const userOrders = JSON.parse(cachedData);
        userOrders.push(newOrder);
        await redis.set(`UserOrders - ${userId}`, JSON.stringify(userOrders));//TODO: add expiration time
    }

    await sendOrderConfirmationEmail(user, newOrder);

    // Create a notification for the admin about the new order
    await notificationModel.create({
      user: user?._id,
      title: "New Order",
      message: `You have a new order from ${user?.name}`,
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get all orders (for user)
export const getMyOrders = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!isValidObjectId(userId)) {
      return next(new ErrorHandler("Invalid user ID.", 400));
    }

    const cachedData = await redis.get(userId);

    if (cachedData) {
      const user = JSON.parse(cachedData);
      const orders = user.orders || [];
      return res.status(200).json({
        success: true,
        source: "cache",
        total: orders.length,
        orders,
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }

    const orders = user.orders;

    if (!orders || orders.length === 0) {
      return next(new ErrorHandler("No orders found for this user.", 404));
    }

    await redis.set(userId, JSON.stringify(user), "EX", 86400); // 24 hours

    res.status(200).json({
      success: true,
      source: "database",
      total: orders.length,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get order details (for user)
export const getOrderDetailsUser = async (req, res, next) => {
  try {

    const userId = req.user?._id;
    const orderId = req.params.id;

    if (!isValidObjectId(orderId)) {
      return next(new ErrorHandler("Invalid order ID.", 400));
    }

    const cachedData = await redis.get(`UserOrders - ${userId}`);

    if (cachedData) {
      const orders = JSON.parse(cachedData);
      const order = orders.find((o) => o._id === orderId);
      if (order) {
        return res.status(200).json({
          success: true,
          source: "cache",
          order,
        });
      }
    }

    const order = await orderModel.findById(orderId); // fetching from db 

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    // await redis.set('allOrders', JSON.stringify(usorderer), "EX", 25200); // 7 hours

    return res.status(200).json({
      success: true,
      source: "database",
      order
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//  send stripe publishble key
export const sendStripePublishableKey = CatchAsyncError(async (req, res) => {
  res.status(200).json({
    publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// new payment
export const newPayment = CatchAsyncError(async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      metadata: {
        company: "E-Learning",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(201).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
