import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import notificationModel from "../models/notification.model.js";
import sendMail from "../utils/sendMail.js";
import { getAllOrdersService } from "../services/order.service.js";
import { redis } from "../utils/redis.js";
import dotenv from "dotenv";
import stripeModule from "stripe";
import { isValidObjectId } from "mongoose";
import CartModel from "../models/cart.model.js";
dotenv.config();

const stripe = stripeModule(process.env.STRIPE_SECRET_KEY);

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
        company: "Beautime",
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


    const order = await orderModel.findById(newOrder._id)
    .populate('user') 
    .populate('cart.productId');

    await sendMail({
      email: user.email,
      subject: "Order Confirmation",
      template: "order-confirmation.html",
      data: { order },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new ErrorHandler(error.message, 400);
  }
};

//create order (for user)
export const createOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const { cart, total, shipping, taxes, shippingAddress, payment_info } = req.body;
    const userId = req.user?._id;

    const user = await userModel.findById(userId);
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }

    await checkPaymentAuthorization(payment_info); 

    const newOrder = new orderModel({
      user: userId,
      cart: cart,
      shippingAddress: shippingAddress,
      paymentMethod: payment_info.payment_method_types[0],
      totalPrice: total,
      taxPrice: taxes,
      shippingPrice: shipping,
      status: "Processing",
      paidAt: payment_info.status === "succeeded" ? new Date() : null,
    });

    await newOrder.save(); // Save the new order to the database
    user.orders.push(newOrder);
    user.totalSpent += totalPrice;
    await user.save(); // updated user data in the database
    await redis.set(req.user?._id, JSON.stringify(user)); // updated user data in Redis
    let userCart = await CartModel.findOne({ userId });
    if (userCart) {
      userCart.items = [];
      await userCart.save();
    }


    await sendOrderConfirmationEmail(user, newOrder);

    // Create a notification for the admin about the new order
    await notificationModel.create({
      user: user?._id,
      title: "New Order",
      message: `You have a new order from ${user?.name}`,
      type: 'order'
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

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

// get all orders (for user)
export const getMyOrders = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!isValidObjectId(userId)) {
      return next(new ErrorHandler("Invalid user ID.", 400));
    }

    // const cachedData = await redis.get(userId);

    // if (cachedData) {
    //   const user = JSON.parse(cachedData);
    //   const orders = user.orders || [];
    //   return res.status(200).json({
    //     success: true,
    //     source: "cache",
    //     total: orders.length,
    //     orders,
    //   });
    // }

    // const user = await userModel.findById(userId);
    const user = await userModel.findById(userId).populate({
      path: 'orders',
      select: 'totalPrice status paidAt cart', // Select the fields you want from the order
      populate: {
        path: 'cart.productId',
        select: 'name price images ' // Specify fields to include from the Product model
      }
    });
    

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


